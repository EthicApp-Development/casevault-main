class CaseTag < ApplicationRecord
  belongs_to :case
  belongs_to :tag
end
