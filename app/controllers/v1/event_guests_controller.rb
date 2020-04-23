# frozen_string_literal: true

class V1::EventGuestsController < ApplicationController
  def create_event_guest
    profile = User.find_by(email: params[:email]).profile
    event = Event.find(params[:id])
    event.event_guests.build(profile_id: profile.id).save
  end

  def pull_guests
    ids = get_array(EventGuest.select(:profile_id).where('event_id = (?)', params[:id]), :profile_id)
    guests = Profile.where('id IN (?)', ids)
    render json: { guests: guests }
  end

  def delete_guest
    profile = User.find_by(email: params[:email]).profile
    event = Event.find(params[:id])
    event.items.each do |item|
      item_guest = item.item_guests.find_by(profile_id: profile.id)
      item_guest.destroy if item_guest
    end
    event.event_guests.find_by(profile_id: profile.id).destroy
  end
end
