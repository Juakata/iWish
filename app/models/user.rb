class User < ApplicationRecord
  before_save :encrypt_user
  validates :email, presence: true, uniqueness: { case_sensitive: false }
  validates :password_digest, presence: true, length: { minumum: 8 }

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def authenticate_password(string)
    BCrypt::Password.new(password_digest).is_password?(string)
  end

  def authenticate_token(string)
    BCrypt::Password.new(token_digest).is_password?(string)
  end

  private

  def encrypt_user
    self.password_digest = User.digest(password_digest)
    self.token_digest = User.digest(token_digest)
  end
end
