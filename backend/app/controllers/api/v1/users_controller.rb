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
  end

  def destroy
  end
end
