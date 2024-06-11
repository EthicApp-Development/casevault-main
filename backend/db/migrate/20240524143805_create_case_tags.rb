class CreateCaseTags < ActiveRecord::Migration[7.1]
  def change
    create_table :case_tags do |t|
      t.references :case, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true

      t.timestamps
    end
  end
end
