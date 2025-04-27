class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  has_many :cases
  has_many :saved_cases
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
  devise :omniauthable, omniauth_providers: [:google_oauth2]

  # For Oauth
  def self.from_google_omniauth(auth)
    where(email: payload['email']).first_or_initialize.tap do |user|
      user.first_name = payload['given_name']
      user.last_name = payload['family_name']
      user.email = payload['email']
      user.uid = payload['sub']
      user.provider = 'google_oauth2'
      user.password ||= Devise.friendly_token[0, 20]
      user.save!
    end
  end
end
