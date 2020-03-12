class V1::SessionsController < ApplicationController
  def sign_in
    render json: { id: params[:id] }
  end
end
