class AddUserRefToCases < ActiveRecord::Migration[7.1]
  def change
    add_reference :cases, :user, null: true, foreign_key: true
  end
end
