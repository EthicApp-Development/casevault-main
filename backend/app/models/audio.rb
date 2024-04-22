class Audio < ApplicationRecord
  belongs_to :case

  has_one_attached :file

  validates :title, presence: true
  validates :description, presence: true
end
