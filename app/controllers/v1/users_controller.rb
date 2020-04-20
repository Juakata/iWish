# frozen_string_literal: true

class V1::UsersController < ApplicationController
  def create
    if params[:password_digest] == params[:repeat]
      token = User.new_token
      @user = User.new(email: params[:email],
                       password_digest: params[:password_digest])
      @user.encrypt_user
      if @user.save
        cookies.permanent[:user_id] = @user.id
        cookies.permanent[:remember_token] = token
        session = @user.sessions.build(key: params[:key], token_digest: Session.digest(token))
        session.save
        profile = @user.build_profile(
          name: '',
          birthday: '1998-06-18',
          picture: ''
        )
        profile.save
        render json: { result: 'created', email: @user.email }
      else
        render json: { user: @user.errors, result: 'user_errors' }
      end
    else
      render json: { result: 'bad_passwords' }
    end
  end
end
