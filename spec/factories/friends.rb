FactoryBot.define do
  factory :friend do
    sender { 1 }
    receiver { 1 }
    status { false }
  end
end
