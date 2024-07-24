class ChannelMembership < ApplicationRecord
  belongs_to :user
  belongs_to :channel

  validates :role, inclusion: { in: ['member', 'creator'] }
end
