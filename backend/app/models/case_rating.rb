class CaseRating < ApplicationRecord
  belongs_to :user
  belongs_to :case

  validates :rating, presence: true, inclusion: { in: 1..5 }
  validates :user_id, uniqueness: { scope: :case_id, message: "ya ha calificado este caso" }
end
