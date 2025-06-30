class UserSearchedTag < ApplicationRecord
  belongs_to :user
  belongs_to :tag

  validates :search_count, numericality: { greater_than_or_equal_to: 0 }

  def self.track_tag_search(user, tag)
    record = UserSearchedTag.find_or_create_by(user: user, tag: tag)
    record.increment!(:search_count)
  end

end
