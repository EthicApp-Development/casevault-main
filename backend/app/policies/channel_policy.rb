class ChannelPolicy < ApplicationController
  attr_reader :context, :record, :user_id

  def initialize(context, record)
    @context = context
    @user = context.user
    @record = record
  end
  
  def index?
    true
  end

  def show?
    record.visibility == 'public' || user_is_member_or_creator?
  end

  def cases?
    record.visibility == 'public' || user_is_member_or_creator?
  end

  def create?
    true
  end

  def update?
    user_is_creator?
  end

  def destroy?
    user_is_creator?
  end

  def add_case?
    user_is_member_or_creator?
  end

  def remove_case?
    user_is_member_or_creator?
  end

  def update_members?
    user_is_creator?
  end

  def remove_member?
    user_is_creator?
  end

  private

  def user_is_creator?
    puts "USUARIO"
    puts "#{@user.first_name}"
    record.creator == @user
  end

  def user_is_member_or_creator?
    record.creator == @user || record.channel_memberships.exists?(user: @user, role: 'member')
  end
end
