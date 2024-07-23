class Channel < ApplicationRecord
    has_many :channel_memberships
    has_many :users, through: :channel_memberships
    has_many :channel_cases
    has_many :cases, through: :channel_cases
  
    validates :name, presence: true
    validates :visibility, inclusion: { in: ['public', 'private'] }
  
    belongs_to :creator, class_name: 'User'
end
