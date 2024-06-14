class Case < ApplicationRecord
    belongs_to :user
    has_many :videos, dependent: :destroy
    has_many :images, dependent: :destroy
    has_many :documents, dependent: :destroy
    has_many :audios, dependent: :destroy
    has_many :case_tags
    has_many :tags, through: :case_tags
    has_one_attached :main_image
    has_many :users_with_access, through: :authorships, source: :user

    enum visibility: [:privado, :publico, :sin_listar], _default: :privado

    accepts_nested_attributes_for :images, :documents, :audios, :videos, allow_destroy: true

    # after_commit :generate_variations, on: [:create, :update]

    private

    # def generate_variations
    #     if main_image.attached?
    #       image = MiniMagick::Image.new(main_image)
    #       image.resize "300x300>"
    #       image.format "webp"
    #       image.write main_image.variant(resize: "300x300>").path
    #     end
    # end
end  
