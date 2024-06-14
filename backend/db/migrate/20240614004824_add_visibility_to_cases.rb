class AddVisibilityToCases < ActiveRecord::Migration[7.1]
  def change
    add_column :cases, :visibility, :integer, default: 0
  end
end
