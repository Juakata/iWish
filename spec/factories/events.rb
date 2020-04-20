# frozen_string_literal: true

FactoryBot.define do
  factory :event do
    title { 'MyString' }
    description { 'MyText' }
    date { '2020-04-15' }
    time { '2020-04-15 14:40:05' }
    user_id { 1 }
  end
end
