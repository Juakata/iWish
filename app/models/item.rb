# frozen_string_literal: true

class Item < ApplicationRecord
  belongs_to :event
  has_many :item_guests, dependent: :destroy
end
