class CreateEventGuests < ActiveRecord::Migration[6.0]
  def change
    create_table :event_guests do |t|
      t.integer :id_event
      t.integer :id_profile

      t.timestamps
    end
  end
end
