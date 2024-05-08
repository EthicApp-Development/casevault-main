class AddVisibilityToCases < ActiveRecord::Migration[7.1]
  def change
    add_column :cases, :visibility, :string, default: "private"
  end
end
