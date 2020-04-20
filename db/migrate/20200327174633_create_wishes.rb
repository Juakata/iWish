class CreateWishes < ActiveRecord::Migration[6.0]
  def change
    create_table :wishes do |t|
      t.string :title
      t.text :description
      t.integer :profile_id

      t.timestamps
    end
  end
end
