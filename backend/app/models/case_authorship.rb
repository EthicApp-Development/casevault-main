class CaseAuthorship < ApplicationRecord
  belongs_to :case
  belongs_to :user
end
