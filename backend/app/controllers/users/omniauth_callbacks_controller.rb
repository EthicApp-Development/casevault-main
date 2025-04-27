require 'google-id-token'

class Users::OmniauthCallbacksController < Devise::OmniauthCallbacksController
  #protect_from_forgery except: [:google_oauth2]
  def google_oauth2
    token = params[:credential]
    # Initialize Google's ID token verifier
    validator = GoogleIDToken::Validator.new
    payload = validator.check(token, ENV['GOOGLE_CLIENT_ID'])
    if payload
      user = User.from_google_omniauth(payload)
      
      if user.persisted?
        jwt_token, _payload = Warden::JWTAuth::UserEncoder.new.call(user, :user, nil)
        render json: { token: jwt_token, user: UserSerializer.new(user).serializable_hash[:data][:attributes] }, status: :ok
      else
        render json: { error: 'User creation failed' }, status: :unauthorized
      end
    else
      render json: { error: 'Invalid Google token' }, status: :unauthorized
    end
  rescue GoogleIDToken::ValidationError => e
    render json: { error: "Google token validation failed: #{e.message}" }, status: :unauthorized
  end
end

