FactoryBot.define do
  factory :session do
    key { "MyString" }
    token_digest { "MyString" }
    user_id { 1 }
  end
end
