class CreateAudios < ActiveRecord::Migration[7.1]
  def change
    create_table :audios do |t|
      t.string :title
      t.string :url
      t.references :case, null: false, foreign_key: true

      t.timestamps
    end
  end
end
