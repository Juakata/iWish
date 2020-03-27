class Wish < ApplicationRecord
  belongs_to :profile
  validates :title, presence: true
  validates :description, presence: true
end
