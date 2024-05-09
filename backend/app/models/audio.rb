class Audio < ApplicationRecord
	belongs_to :case

	has_one_attached :file

	def file_url
		Rails.application.routes.url_helpers.url_for(file) if file.attached?
	end
end
