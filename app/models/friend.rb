class Friend < ApplicationRecord
  belongs_to :user, class_name: 'User'
  belongs_to :user, class_name: 'User'
  validate :unique_relation, on: :create

  def unique_relation
    error.add(:warning, 'Cannot add self as friend') if receiver == sender
    friend = Friend.where('receiver = (?) AND sender = (?)', receiver, sender).first
    friend = Friend.where('receiver = (?) AND sender = (?)', sender, receiver).first if friend.nil?
    error.add(:warning, 'Already friends') unless friend.nil?
  end
end
