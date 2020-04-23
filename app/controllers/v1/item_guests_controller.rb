# frozen_string_literal: true

class V1::ItemGuestsController < ApplicationController
  def create_item_guest
    profile = User.find_by(email: params[:email]).profile
    item = Item.find(params[:id])
    item.item_guests.build(profile_id: profile.id).save
  end

  def pull_guests
    ids = get_array(ItemGuest.select(:profile_id).where('item_id = (?)', params[:id]), :profile_id)
    guests = Profile.where('id IN (?)', ids)
    render json: { guests: guests }
  end

  def delete_guest
    profile = User.find_by(email: params[:email]).profile
    item = Item.find(params[:id])
    item_guest = item.item_guests.find_by(profile_id: profile.id)
    item_guest.destroy if item_guest
  end
end
