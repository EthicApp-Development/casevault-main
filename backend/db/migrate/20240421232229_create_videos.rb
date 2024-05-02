class CreateVideos < ActiveRecord::Migration[7.1]
  def change
    create_table :videos do |t|
      t.string :url
      t.string :title
      t.text :description
      t.references :case, null: false, foreign_key: true

      t.timestamps
    end
  end
end
