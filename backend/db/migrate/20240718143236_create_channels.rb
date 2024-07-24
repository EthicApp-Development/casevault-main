class CreateChannels < ActiveRecord::Migration[7.1]
  def change
    create_table :channels do |t|
      t.string :name
      t.text :description
      t.string :visibility
      t.integer :creator_id

      t.timestamps
    end
  end
end
