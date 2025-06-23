class Api::V1::UsersController < ApplicationController
  def index
    users = User.all
    render json: {info: users, status: :success}
  end

  # GET /users/1
  def show
    user = User.find(params[:id])
    render json: {info: user, status: :success}
  end


  def new
  end

  def create
  end

  def edit
  end

  def update
    if @current_user&.update(user_params)
      render json: {
        data: UserSerializer.new(@current_user).serializable_hash[:data][:attributes],
        status: :updated
      }
    else
      render json: { errors: @current_user.errors.full_messages, status: :unprocessable_entity}, status: :unprocessable_entity
    end
  end

  def destroy
  end

  private

  def user_params
    params.require(:user).permit(:track_tag_searches)
  end
end
