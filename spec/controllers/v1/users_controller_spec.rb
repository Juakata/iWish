# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::UsersController, type: :controller do
  let(:valid_attributes) do
    {
      email: 'andoni@gmail.com',
      password_digest: '12345678',
      repeat: '12345678'
    }
  end

  let(:invalid_attributes) do
    {
      email: 'andoni',
      password_digest: '12345678',
      repeat: '12345678'
    }
  end

  describe 'GET user creation' do
    context 'with valid params' do
      it 'creates a new User' do
        expect do
          get :create, params: valid_attributes
        end.to change(User, :count).by(1)
      end
    end

    context 'with invalid params' do
      it 'does not create user' do
        expect do
          get :create, params: invalid_attributes
        end.to change(User, :count).by(0)
      end
    end
  end
end
