# frozen_string_literal: true

require 'rails_helper'

RSpec.describe User, type: :model do
  describe 'validations' do
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_presence_of(:password_digest) }
    
    it 'valid password' do
      record = User.new(email: "andoni@gmail.com", password_digest: "123")
      expect(record).to_not be_valid
      record.password_digest = "12345678"
      expect(record).to be_valid
    end

    it 'valid email' do
      record = User.new(email: "andoni@gmail", password_digest: "12345678")
      expect(record).to_not be_valid
      record.email = "andoni@gmail.com"
      expect(record).to be_valid
    end
  end
end
