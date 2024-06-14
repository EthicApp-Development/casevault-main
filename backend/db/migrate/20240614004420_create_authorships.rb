class CreateAuthorships < ActiveRecord::Migration[7.1]
  def change
    create_table :authorships do |t|
      t.references :user, null: false, foreign_key: true
      t.references :case, null: false, foreign_key: true

      t.timestamps
    end
  end
end
