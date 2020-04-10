# frozen_string_literal: true

class V1::GiversController < ApplicationController
  def get_givers
    wish = Wish.find(params[:id])
    if wish
      ids = wish.givers.select(:friend_id).all
      givers = Profile.where("id in (?)", ids)
      render json: { id: wish.id, givers: givers }
    else
      render json: { result: 'Not found' }
    end
  end

  def add_giver
    wish = Wish.find(params[:id])
    profile = User.find_by(email: params[:email]).profile
    wish.givers.build(friend_id: profile.id).save
  end

  def remove_giver
    wish = Wish.find(params[:id])
    wish.givers.find_by(friend_id: params[:profile]).destroy
  end
end
