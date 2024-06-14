# frozen_string_literal: true

class Users::SessionsController < Devise::SessionsController

  respond_to :json


  def create
    user = User.find_for_database_authentication(email: params[:user][:email])

    if user && user.valid_password?(params[:user][:password])
      token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
      response.headers['Authorization'] = "Bearer #{token[0]}"
      render json: { message: "Inicio de sesión exitoso", user: user }, status: :ok
    else
      render json: { error: "Credenciales inválidas" }, status: :unauthorized
    end
  end

  def destroy
    # Devise maneja la lógica de cerrar sesión, solo necesitas limpiar la sesión actual
    signed_out = (Devise.sign_out_all_scopes ? sign_out : sign_out(resource_name))
    render json: {
      status: signed_out ? 200 : 401,
      message: signed_out ? 'User signed out successfully' : 'User has no active session'
    }, status: signed_out ? :ok : :unauthorized
  end

  private

  def respond_with(resource, options = {})
    render json: {
      status: { code: 200, message: 'User signed in successfully.', data: current_user }, 
    }, status: :ok
  end

  def respond_to_on_destroy
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1], 
      Rails.application.credentials.fetch(:secret_key_base)).first
    current_user = User.find(jwt_payload['sub'])

    if current_user
      render json: {
        status: 200,
        message: 'User signed out successfully'
      }, status: :ok, data: current_user
    else
      render json: {
        status: 401,
        message: 'User has no active session'
      }, status: :unauthorized
    end
  end
  # before_action :configure_sign_in_params, only: [:create]

  # GET /resource/sign_in
  # def new
  #   super
  # end

  # POST /resource/sign_in
  # def create
  #   super
  # end

  # DELETE /resource/sign_out
  # def destroy
  #   super
  # end

  # protected

  # If you have extra params to permit, append them to the sanitizer.
  # def configure_sign_in_params
  #   devise_parameter_sanitizer.permit(:sign_in, keys: [:attribute])
  # end
end
