class CreateEventGuests < ActiveRecord::Migration[6.0]
  def change
    create_table :event_guests do |t|
      t.integer :event_id
      t.integer :profile_id

      t.timestamps
    end
  end
end
