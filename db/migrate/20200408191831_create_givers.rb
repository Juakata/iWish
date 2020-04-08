class CreateGivers < ActiveRecord::Migration[6.0]
  def change
    create_table :givers do |t|
      t.integer :wish_id
      t.integer :friend_id

      t.timestamps
    end
  end
end
