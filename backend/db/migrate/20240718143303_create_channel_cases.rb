class CreateChannelCases < ActiveRecord::Migration[7.1]
  def change
    create_table :channel_cases do |t|
      t.references :channel, null: false, foreign_key: true
      t.references :case, null: false, foreign_key: true

      t.timestamps
    end
  end
end
