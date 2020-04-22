# frozen_string_literal: true

class Wish < ApplicationRecord
  belongs_to :profile
  has_many :givers, dependent: :destroy
  validates :title, presence: true
  validates :description, presence: true
end
