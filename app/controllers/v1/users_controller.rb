class V1::UsersController < ApplicationController
  def create
    @user = User.new(user_params)
    if @user.save
      render json: { result: true }
    else
      render json: @user.erros, { result: false } 
    end
  end

  private

  def user_params
    params.required(:user).permit(:email, :password)
  end
end
