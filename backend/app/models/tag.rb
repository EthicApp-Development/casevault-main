class Tag < ApplicationRecord
    has_many :case_tags
    has_many :cases, through: :case_tags
    has_many :user_searched_tags, dependent: :destroy
    has_many :searching_users, through: :user_searched_tags, source: :user

    validates :name, presence: true, uniqueness: true
end
