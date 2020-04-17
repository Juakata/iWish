# frozen_string_literal: true

class Profile < ApplicationRecord
  belongs_to :user
  has_many :wishes
  has_many :givers
end
