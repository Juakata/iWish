# frozen_string_literal: true

class EventGuest < ApplicationRecord
  belongs_to :event
  belongs_to :profile
end
