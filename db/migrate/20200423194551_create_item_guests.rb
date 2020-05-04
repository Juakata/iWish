class CreateItemGuests < ActiveRecord::Migration[6.0]
  def change
    create_table :item_guests do |t|
      t.integer :item_id
      t.integer :profile_id

      t.timestamps
    end
  end
end
