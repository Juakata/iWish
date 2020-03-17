# frozen_string_literal: true

class V1::SessionsController < ApplicationController
  def auto_sign_in
    user = User.find(params[:id])
    if user
      if user.authenticate_token(params[:token])
        render json: { email: user.email }
      else
        render json: { result: 'unverified' }, status: 404
      end
    else
      render json: { result: 'Unable to find an account.' }, status: 404
    end
  end

  def sign_in
    user = User.find_by(email: params[:email])
    if user
      if user.authenticate_password(params[:password])
        log_in(user)
      else
        render json: { result: 'Unable to verify account.' }
      end
    else
      render json: { result: 'Unable to find an account.' }
    end
  end

  def sign_out
    cookies.delete(:user_id)
    cookies.delete(:remember_token)
    render json: { result: 'Deleted' }
  end

  private

  def log_in(user)
    cookies.permanent[:user_id] = user.id
    token_digest = User.new_token
    cookies.permanent[:remember_token] = token_digest
    user.update_token(token_digest)
    render json: { email: user.email }
  end
end
