class CreateCaseAuthorships < ActiveRecord::Migration[7.1]
  def change
    create_table :case_authorships do |t|
      t.belongs_to :case, null: false, foreign_key: true
      t.belongs_to :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
