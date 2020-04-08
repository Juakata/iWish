class Giver < ApplicationRecord
  belongs_to :wish
  belongs_to :friend, class_name: 'Profile'
end
