class CreateUserSearchedTags < ActiveRecord::Migration[7.1]
  def change
    create_table :user_searched_tags do |t|
      t.references :user, null: false, foreign_key: true
      t.references :tag, null: false, foreign_key: true
      t.integer :search_count, default: 0, null: false

      t.timestamps
    end
  end
end
