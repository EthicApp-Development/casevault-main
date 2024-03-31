class CreateCases < ActiveRecord::Migration[7.1]
  def change
    create_table :cases do |t|
      t.text :title
      t.text :description
      t.text :body

      t.timestamps
    end
  end
end
