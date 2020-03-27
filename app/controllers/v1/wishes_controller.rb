# frozen_string_literal: true

class V1::WishesController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    profile = user.profile
    if profile
      wish = profile.wishes.build(
        title: params[:title],
        description: params[:description])
      if wish.valid?
        wish.save
        render json: { result: 'created'}
      else
        render json: wish.errors
      end
    else
      render json: { result: 'not_found'}
    end
  end

  def get_wishes
    user = User.find_by(email: params[:email])
    profile = user.profile
    if profile
      render json: profile.wishes
    else
      render json: { result: 'not_found'}
    end
  end
end
