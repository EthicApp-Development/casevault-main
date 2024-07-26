class Api::V1::ChannelsController < ApplicationController
    before_action :set_channel, only: [:show, :update, :destroy, :add_case, :remove_case, :update_members, :remove_member]
    before_action :set_user, except: :public_channels

    after_action :verify_authorized, except: [:index, :public_channels, :my_channels, :remove_member]

    def index
      @channels = Channel.all
      render json: @channels
    end

    def show
      authorize @channel, policy_class: ChannelPolicy
      channel_data = @channel.as_json(include: [:cases, :users])
  
      cases_with_images = @channel.cases.map do |c|
        case_json = c.as_json
        if c.main_image.attached?
          case_json.merge!(main_image_url: url_for(c.main_image))
        else
          case_json.merge!(main_image_url: nil)
        end
        saved = SavedCase.exists?(user_id: @user.id, case_id: c.id)
        user_info = c.user.present? ? { first_name: c.user.first_name, last_name: c.user.last_name } : {}
        case_json.merge!(user_info: user_info, saved: saved)
      end
  
      channel_data.merge!(cases: cases_with_images)
  
      render json: channel_data
    end

    def update
      authorize @channel, policy_class: ChannelPolicy
      if @channel.update(channel_params)
        render json: @channel
      else
        render json: @channel.errors, status: :unprocessable_entity
      end
    end

    def create
      @channel = Channel.new(channel_params)
      @channel.creator = @user
      authorize @channel, policy_class: ChannelPolicy

      if @channel.save
        ChannelMembership.create(user: @user, channel: @channel, role: 'admin')
        render json: @channel, status: :created
      else
        render json: @channel.errors, status: :unprocessable_entity
      end
    end

    def destroy
      authorize @channel, policy_class: ChannelPolicy
      @channel.destroy
      head :no_content
    end

    def add_case
      authorize @channel, :add_case?, policy_class: ChannelPolicy
      @case = Case.find(params[:case_id])
      @channel.cases << @case unless @channel.cases.include?(@case)
      head :no_content
    end

    def remove_case
      authorize @channel, :remove_case?, policy_class: ChannelPolicy
      @case = Case.find(params[:case_id])
      @channel.cases.delete(@case)
      head :no_content
    end

    def public_channels
      @channels = Channel.where(visibility: 'public')
      channels_with_members = @channels.map do |channel|
        {
          id: channel.id,
          name: channel.name,
          description: channel.description,
          creator_id: channel.creator_id,
          visibility: channel.visibility,
          member_count: channel.users.count + 1,
          users: channel.users,
        }
      end
      render json: channels_with_members
    end

    def my_channels
      created_channels = Channel.where(creator_id: @user.id)
      member_channels = Channel.joins(:channel_memberships).where(channel_memberships: { user_id: @user.id })
      
      @channels = (created_channels + member_channels).uniq
      
      render json: @channels, include: [:cases, :users]
    end
    
    def update_members
      authorize @channel, :update_members?
    
      new_member_ids = params[:user_ids].map(&:to_i)
    
      # Obtener los usuarios actuales y los nuevos
      new_members = User.where(id: new_member_ids)
      current_members = @channel.users
    
      # Identificar y eliminar miembros que ya no están en la lista
      removed_members = current_members.where.not(id: new_member_ids)
    
      # Imprimir correos electrónicos de los miembros eliminados
      removed_members_emails = removed_members.pluck(:email)
      puts "Miembros eliminados: #{removed_members_emails.join(', ')}"
    
      @channel.users.delete(removed_members)
    
      # Añadir nuevos miembros
      added_members = []
      new_members.each do |user|
        unless current_members.include?(user)
          @channel.channel_memberships.create(user: user, role: "member")
          added_members << user
        end
      end
    
      if @channel.save
        # Recargar la relación de usuarios del canal
        @channel.reload
        render json: { success: true, members: @channel.users }, status: :ok
      else
        render json: { errors: @channel.errors.full_messages }, status: :unprocessable_entity
      end
    end

    def remove_member
      @user_to_remove = User.find(params[:user_id])
      if @user_to_remove
        @channel.users.delete(@user_to_remove)
        head :no_content
      else
        render json: { error: 'User not found' }, status: :not_found
      end
    end

    private

    def set_channel
      @channel = Channel.includes(:cases, :users).find(params[:id])
    end

    def set_user
      @user = User.find(params[:user_id])
    end

    def channel_params
      params.require(:channel).permit(:name, :description, :visibility)
    end
  end