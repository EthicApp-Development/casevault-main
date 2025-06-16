class AddViewsToCases < ActiveRecord::Migration[7.1]
  def change
    add_column :cases, :views, :integer, default: 0
  end
end
