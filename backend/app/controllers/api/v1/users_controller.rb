class Api::V1::UsersController < ApplicationController
  def index
  end

  # GET /users/1
  def show
    puts "HOLAAAA"
    puts "--------------------"
    puts "#{params[:id]}"
    puts "#{params.inspect}"
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
