class AddTrackTagSearchesToUsers < ActiveRecord::Migration[7.1]
  def change
    add_column :users, :track_tag_searches, :boolean, default: true, null: false
  end
end
