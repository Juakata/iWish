# frozen_string_literal: true

require 'rails_helper'

RSpec.describe V1::SessionsController, type: :controller do
  let(:valid_attributes) do
    {
      email: 'uzquiano@gmail.com',
      password: '12345678'
    }
  end

  let(:invalid_attributes) do
    {
      email: 'uzquiano@gmail.com',
      password: '45678'
    }
  end

  let(:valid_attributes_auto) do
    {
      id: 1,
      token: 'token'
    }
  end

  let(:invalid_attributes_auto) do
    {
      id: 1,
      token: 'asds'
    }
  end

  describe 'GET for auto sign in' do
    context 'with valid params' do
      it 'should let the user sign in' do
        create(:user)
        get :auto_sign_in, params: valid_attributes_auto
        expect(response).to have_http_status('200')
      end
    end

    context 'with invalid params' do
      it 'should not let the user sign in' do
        create(:user)
        get :auto_sign_in, params: invalid_attributes_auto
        expect(response).to have_http_status('404')
      end
    end
  end

  describe 'GET for normal sign in' do
    context 'with valid params' do
      it 'should let the user sign in' do
        create(:user)
        get :sign_in, params: valid_attributes
        expect(response).to have_http_status('200')
      end
    end

    context 'with invalid params' do
      it 'should not let the user sign in' do
        create(:user)
        get :sign_in, params: invalid_attributes
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end
