class Comment < ApplicationRecord
  belongs_to :user
  belongs_to :case

  has_many :votes
  has_many :voters, through: :votes, source: :user

  def user_vote_by(user)
    return nil unless user
    votes.find_by(user_id: user.id)&.value
  end

  def upvotes_count
  votes.upvotes.count
  end

  def downvotes_count
    votes.downvotes.count
  end


end
