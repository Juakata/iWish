# frozen_string_literal: true

FactoryBot.define do
  factory :wish do
    title { 'MyString' }
    description { 'MyText' }
    profile_id { 1 }
  end
end
