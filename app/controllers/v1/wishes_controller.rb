# frozen_string_literal: true

class V1::WishesController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    profile = user.profile
    if profile
      wish = profile.wishes.build(
        title: params[:title],
        description: params[:description]
      )
      if wish.valid?
        wish.save
        render json: { id: wish.id, result: 'created' }
      else
        render json: wish.errors
      end
    else
      render json: { result: 'not_found' }
    end
  end

  def pull_wishes
    user = User.find_by(email: params[:email]) if params[:email]
    profile = Profile.find(params[:id]) if params[:id]
    profile ||= user.profile
    if profile
      render json: profile.wishes.order(created_at: :asc)
    else
      render json: { result: 'not_found' }
    end
  end

  def update_wish
    user = User.find_by(email: params[:email])
    profile = user.profile
    if profile
      wish = user.profile.wishes.find(params[:wishId])
      wish.update_attributes(title: params[:title], description: params[:description])
      render json: profile.wishes
    else
      render json: { result: 'not_found' }
    end
  end

  def delete_wish
    user = User.find_by(email: params[:email])
    profile = user.profile
    if profile
      wish = profile.wishes.find(params[:wishId])
      wish.destroy
      render json: profile.wishes
    else
      render json: { result: 'not_found' }
    end
  end
end
