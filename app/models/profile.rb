# frozen_string_literal: true

class Profile < ApplicationRecord
  belongs_to :user
  has_many :wishes, dependent: :destroy
  has_many :givers, dependent: :destroy
  has_many :event_guests, dependent: :destroy
  has_many :item_guests, dependent: :destroy
end
