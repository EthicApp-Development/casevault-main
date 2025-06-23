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
  has_many :user_searched_tags, dependent: :destroy
  has_many :searched_tags, through: :user_searched_tags, source: :tag
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: self
  
end
