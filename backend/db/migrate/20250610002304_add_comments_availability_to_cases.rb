class AddCommentsAvailabilityToCases < ActiveRecord::Migration[7.1]
  def change
    add_column :cases, :comments_availability, :integer, default: 1, null: false
  end
end
