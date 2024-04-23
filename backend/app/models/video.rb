class Video < ApplicationRecord
  belongs_to :cases

  validates :title
  validates :description
  validates :url
end
