class AddVotesToComments < ActiveRecord::Migration[7.1]
  def change
    add_column :comments, :votes, :integer, default: 0, null: false
  end
end
