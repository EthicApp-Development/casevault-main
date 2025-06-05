class User < ApplicationRecord
  include Devise::JWT::RevocationStrategies::JTIMatcher
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable

  has_many :cases
  has_many :saved_cases
  has_many :comments, dependent: :destroy
  has_many :votes
  has_many :voted_comments, through: :votes, source: :comment
  has_many :case_ratings, dependent: :destroy
  has_many :rated_cases, through: :case_ratings, source: :case
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
  
end
