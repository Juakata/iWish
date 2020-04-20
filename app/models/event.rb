# frozen_string_literal: true

class Event < ApplicationRecord
  belongs_to :user
  has_many :items
  has_many :event_guests
end
