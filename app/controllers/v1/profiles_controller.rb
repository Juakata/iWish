# frozen_string_literal: true

class V1::ProfilesController < ApplicationController
  def create
    user = User.find_by(email: params[:email])
    if user
      if user.profile
        user.profile.update_attributes(
          name: params[:name],
          birthday: params[:birthday],
          picture: params[:picture]
        )
        render json: { result: 'Profile updated.' }
      else
        profile = user.build_profile(
          name: params[:name],
          birthday: params[:birthday],
          picture: params[:picture]
        )
        profile.save
        render json: { result: 'Profile created.' }
      end
    else
      render json: { result: 'User not found.' }
    end
  end

  def show
    user = User.find_by(email: params[:email])
    render json: user.profile
  end
end
