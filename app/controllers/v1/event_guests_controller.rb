# frozen_string_literal: true

class V1::EventsGuestsController < ApplicationController
  def create_event_guest
    profile = User.find_by(email: params[:email]).profile
    event = Event(params[:id])
    event.event_guests.build(profile_id: profile.id).save
  end
end
