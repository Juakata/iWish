class V1::SessionsController < ApplicationController
  def sign_in
    render json: { email: params[:email], password: params[:password] }
  end
end
