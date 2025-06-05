class CreateCaseRatings < ActiveRecord::Migration[7.1]
  def change
    create_table :case_ratings do |t|
      t.references :user, null: false, foreign_key: true
      t.references :case, null: false, foreign_key: true
      t.integer :rating

      t.timestamps
    end
  end
end
