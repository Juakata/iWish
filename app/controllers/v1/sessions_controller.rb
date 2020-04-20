# frozen_string_literal: true

class V1::SessionsController < ApplicationController
  def auto_sign_in
    if params[:id].match(/[azAZ]/)
      sign_out
    else
      user = User.where('id = (?)', params[:id]).first
      check_user(user, params[:key], params[:token])
    end
  end

  def sign_in
    user = User.find_by(email: params[:email])
    if user
      if user.authenticate_password(params[:password])
        log_in(user, params[:key])
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

  def log_in(user, key)
    cookies.permanent[:user_id] = user.id
    token_digest = User.new_token
    cookies.permanent[:remember_token] = token_digest
    session = user.sessions.find_by(key: key)
    if session
      session.update_attribute(:token_digest, Session.digest(token_digest))
    else
      session = user.sessions.build(key: key, token_digest: Session.digest(token_digest))
      session.save
    end
    render json: { email: user.email }
  end

  def check_user(user, key, token)
    if user
      session = user.sessions.find_by(key: key)
      if session
        if session.authenticate_token(token)
          render json: { email: user.email }
        else
          sign_out
        end
      else
        sign_out
      end
    else
      sign_out
    end
  end
end
