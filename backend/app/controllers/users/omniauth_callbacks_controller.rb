class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
    def google_oauth2
      user = User.from_google_omniauth(request.env['omniauth.auth'])
      puts(user)
  
      if user.persisted?
        sign_in(user)
        token = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil).first
        render json: { token:, user: user }, status: :ok
      else
        render json: { error: 'Authentication failed' }, status: :unauthorized
      end
    end
  
    def failure
      render json: { error: 'OAuth authentication failed' }, status: :unauthorized
    end
  end
  