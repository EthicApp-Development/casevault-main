class Document < ApplicationRecord
  belongs_to :case
  
  has_one_attached :file

  validates :title
  validates :description

  def document_url
    Rails.application.routes.url_helpers.url_for(file) if file.attached?
  end
end
