class Case < ApplicationRecord
    belongs_to :user
    has_many :videos, dependent: :destroy
    has_many :images, dependent: :destroy
    has_many :documents, dependent: :destroy
    has_many :audios, dependent: :destroy

    has_one_attached :main_image

    accepts_nested_attributes_for :images, :documents, :audios, :videos, allow_destroy: true

    after_commit :generate_variations, on: [:create, :update]

    private

    def generate_variations
        main_image.variant(resize: "300x300", format: :webp).processed
    end
end  
