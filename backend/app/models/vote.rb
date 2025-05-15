class Vote < ApplicationRecord
  belongs_to :user
  belongs_to :comment

  validates :user_id, uniqueness: { scope: :comment_id }
  validates :value, inclusion: { in: [-1, 1] } #downvote & upvote

  scope :upvotes, -> { where(value: 1) }
  scope :downvotes, -> { where(value: -1) }
end
