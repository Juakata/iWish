class Session < ApplicationRecord
  belongs_to :user
  validates :token_digest, presence: true
  validates :user_id, presence: true
  validates :key, presence: true

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def authenticate_token(string)
    BCrypt::Password.new(token_digest).is_password?(string)
  end

end
