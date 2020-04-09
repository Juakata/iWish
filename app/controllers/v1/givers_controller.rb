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
end
