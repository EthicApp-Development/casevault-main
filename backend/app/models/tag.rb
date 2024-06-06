class Tag < ApplicationRecord
    has_many :case_tags
    has_many :cases, through: :case_tags


    validates :name, presence: true, uniqueness: true
end
