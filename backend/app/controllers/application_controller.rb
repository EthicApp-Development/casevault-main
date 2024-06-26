class ApplicationController < ActionController::API
    before_action :configure_permitted_parameters, if: :devise_controller?

    before_action :authenticate_user_from_token!

    private
  
    def authenticate_user_from_token!
      token = request.headers['Authorization']&.split(' ')&.last
      if token
        begin
          decoded_token = JWT.decode(token, Rails.application.credentials.fetch(:secret_key_base), true, { algorithm: 'HS256' })
          payload = decoded_token.first
          user_id = payload['sub'] # Assuming 'sub' in payload represents user id
          @current_user = User.find_by(id: user_id)
          puts "#{@current_user}"
          puts "SI SE ENCONTRO UN USUARIO CON EL TOKEN"
        end
      end
    end
  
    def current_user
      @current_user
    end

    protected
  
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :email, :password, :password_confirmation])
      devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :email, :password, :password_confirmation, :current_password])
    end
end
