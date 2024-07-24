class CreateChannelMemberships < ActiveRecord::Migration[7.1]
  def change
    create_table :channel_memberships do |t|
      t.references :user, null: false, foreign_key: true
      t.references :channel, null: false, foreign_key: true
      t.string :role

      t.timestamps
    end
  end
end
