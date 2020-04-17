# frozen_string_literal: true

FactoryBot.define do
  factory :friend do
    sender { 1 }
    receiver { 1 }
    status { false }
  end
end
