class CreateFriends < ActiveRecord::Migration[6.0]
  def change
    create_table :friends do |t|
      t.integer :sender
      t.integer :receiver
      t.boolean :status, default: false

      t.timestamps
    end
  end
end
