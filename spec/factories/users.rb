# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    id { 1 }
    email { 'uzquiano@gmail.com' }
    password_digest { User.digest('12345678') }
    token_digest { User.digest('token') }
  end
end
