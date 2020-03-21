class Profile < ApplicationRecord
  validates :name, presence: true
  validates :birthday, presence: true
  validates :picture, presence: true
  belongs_to :user
end
