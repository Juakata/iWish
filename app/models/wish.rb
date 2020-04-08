class Wish < ApplicationRecord
  belongs_to :profile
  has_many :givers
  validates :title, presence: true
  validates :description, presence: true
end
