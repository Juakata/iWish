# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :user
  has_many :items, dependent: :destroy
  has_many :event_guests, dependent: :destroy
end
