# frozen_string_literal: true

class V1::EventGuestsController < ApplicationController
  def create_event_guest
    profile = User.find_by(email: params[:email]).profile
    event = Event.find(params[:id])
    event.event_guests.build(profile_id: profile.id).save
  end
end
