class User < ApplicationRecord
  VALID_EMAIL_REGEX = /\A[\w+\-.]+@[a-z\d\-]+(\.[a-z\d\-]+)*\.[a-z]+\z/i
  validates :email, presence: true, length: { maximum: 255 },
            format: { with: VALID_EMAIL_REGEX },
            uniqueness: { case_sensitive: false }
  validates :password_digest, presence: true, length: { minimum: 8 }

  def self.digest(string)
    cost = ActiveModel::SecurePassword.min_cost ? BCrypt::Engine::MIN_COST : BCrypt::Engine.cost
    BCrypt::Password.create(string, cost: cost)
  end

  def self.new_token
    SecureRandom.urlsafe_base64
  end

  def update_token(token)
    self.token_digest = token
    update_attribute(:token_digest, User.digest(token_digest))
  end

  def authenticate_password(string)
    BCrypt::Password.new(password_digest).is_password?(string)
  end

  def authenticate_token(string)
    BCrypt::Password.new(token_digest).is_password?(string)
  end

  def encrypt_user
    self.password_digest = User.digest(password_digest)
    self.token_digest = User.digest(token_digest)
  end
end
