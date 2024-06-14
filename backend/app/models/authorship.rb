class Authorship < ApplicationRecord
  belongs_to :user
  belongs_to :case
end
