class ApplicationController < ActionController::API
    include Pundit::Authorization
    before_action :configure_permitted_parameters, if: :devise_controller?

    before_action :authenticate_user_from_token!
    rescue_from Pundit::NotAuthorizedError, with: :user_not_authorized
    private
  
    def authenticate_user_from_token!
      token = request.headers['Authorization']&.split(' ')&.last
      if token
        begin
          decoded_token = JWT.decode(token, ENV.fetch("JWT_SECRET_KEY"), true, algorithm: 'HS256')
          payload = decoded_token.first
          user_id = payload['sub'] # Assuming 'sub' in payload represents user id
          @current_user = User.find_by(id: user_id)
          
          if @current_user
            puts "Usuario encontrado con el token: #{@current_user}"
          else
            puts "No se encontró ningún usuario con el id: #{user_id}"
          end
        rescue JWT::DecodeError => e
          puts "Error al decodificar el token: #{e.message}"
        rescue JWT::VerificationError => e
          puts "Error de verificación del token: #{e.message}"
        end
      else
        puts "No se encontró token en el encabezado de autorización."
      end
    end

    def pundit_user
      PunditContext.new(current_user_from_params, params)
    end
  
    def user_not_authorized(exception)
      render json: { error: exception.policy.class.to_s.underscore + '.' + exception.query.to_s }, status: :forbidden
    end
  
    def current_user_from_params
      @current_user_from_params ||= User.find(params[:user_id]) if params[:user_id]
    end

    protected
  
    def configure_permitted_parameters
      devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :email, :password, :password_confirmation])
      devise_parameter_sanitizer.permit(:account_update, keys: [:first_name, :last_name, :email, :password, :password_confirmation, :current_password])
    end
end
