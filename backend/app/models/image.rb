class Image < ApplicationRecord
  belongs_to :case

  has_one_attached :file

  def image_url
    Rails.application.routes.url_helpers.url_for(file) if file.attached?
  end
end
