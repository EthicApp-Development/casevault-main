class RemoveVotesFromComments < ActiveRecord::Migration[7.1]
  def change
    remove_column :comments, :votes, :integer
  end
end
