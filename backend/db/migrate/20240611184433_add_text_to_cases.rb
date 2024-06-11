class AddTextToCases < ActiveRecord::Migration[7.1]
  def change
    add_column :cases, :text, :text
  end
end
