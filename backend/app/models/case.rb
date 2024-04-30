class Case < ApplicationRecord
    belongs_to :user
    has_many :videos, dependent: :destroy
    has_many :images, dependent: :destroy
    has_many :documents, dependent: :destroy
    has_many :audios, dependent: :destroy

    accepts_nested_attributes_for :images, :documents, :audios, :videos, allow_destroy: true
    
end  
