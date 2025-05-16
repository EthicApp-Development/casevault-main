class CreateVotes < ActiveRecord::Migration[7.1]
  def change
    create_table :votes do |t|
      t.references :user, null: false, foreign_key: true
      t.references :comment, null: false, foreign_key: true
      t.integer :value, null: false

      t.timestamps
    end
    add_index :votes, [:user_id, :comment_id], unique: true
  end
end
