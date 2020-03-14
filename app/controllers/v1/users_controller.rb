class V1::UsersController < ApplicationController
  def create
    if (params[:password_digest] == params[:repeat])
      token = User.new_token
      @user = User.new(email: params[:email],
                      password_digest: params[:password_digest],
                      token_digest: token)
      if @user.save
        cookies.permanent[:remember_token] = token
        render json: { result: true }
      else
        render json: @user.errors, status: :unprocessable_entity
      end
    else
      render json: { result: "Passwords do not match." }
    end
  end
end
