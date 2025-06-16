class Case < ApplicationRecord
    belongs_to :user
    has_many :videos, dependent: :destroy
    has_many :images, dependent: :destroy
    has_many :documents, dependent: :destroy
    has_many :audios, dependent: :destroy
    has_many :case_tags, dependent: :destroy
    has_many :tags, through: :case_tags
    has_one_attached :main_image
    has_many :comments, dependent: :destroy
    has_many :case_ratings, dependent: :destroy
    has_many :raters, through: :case_ratings, source: :user

    accepts_nested_attributes_for :images, :documents, :audios, :videos, allow_destroy: true
    enum visibility: {private_status: 0, public_status: 1, unlisted_status: 2}, _default: :private_status
    enum comments_availability: { comments_disabled: 0, comments_enabled: 1 }, _default: :comments_enabled
    before_destroy :purge_attachments

    def average_rating
      case_ratings.average(:rating)&.round(2)
    end

    private
  
    def purge_attachments
      main_image.purge if main_image.attached?
    end
end  
