# frozen_string_literal: true

FactoryBot.define do
  factory :item do
    title { 'MyString' }
    description { 'MyText' }
    event_id { 1 }
  end
end
