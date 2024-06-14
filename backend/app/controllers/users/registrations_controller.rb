class Users::RegistrationsController < Devise::RegistrationsController
  respond_to :json

  def sign_up_params
    params.require(:user).permit(:email, :password, :first_name, :last_name)
  end

  def create
    build_resource(sign_up_params)

    resource.save
    if resource.persisted?
      if resource.active_for_authentication?
        sign_up(resource_name, resource)
        token = Warden::JWTAuth::UserEncoder.new.call(resource, :user, nil)
        response.headers['Authorization'] = "Bearer #{token[0]}"
        render json: {
          status: { code: 200, message: 'Signed up successfully.' },
          data: resource
        }, status: :ok
      else
        expire_data_after_sign_in!
        render json: {
          status: { code: 200, message: "Signed up but #{resource.inactive_message}" },
          data: resource
        }, status: :ok
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      render json: {
        status: { errors: resource.errors.full_messages, message: 'User could not be created successfully' }
      }, status: :unprocessable_entity
    end
  end

  private

  def respond_with(resource, _opts = {})
    if resource.persisted?
      sign_in(resource) # Iniciar sesión al usuario recién registrado
      render json: {
        status: { code: 200, message: 'Signed up successfully.' },
        data: resource
      }, status: :ok, location: after_sign_up_path_for(resource)
    else
      render json: {
        status: { errors: resource.errors.full_messages, message: 'User could not be created successfully' }
      }, status: :unprocessable_entity
    end
  end
end