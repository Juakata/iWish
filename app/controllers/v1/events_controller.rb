# frozen_string_literal: true

class V1::EventsController < ApplicationController
  def create_event
    user = User.find_by(email: params[:email])
    if user
      event = user.events.build(
        title: params[:title],
        description: params[:description],
        date: params[:date],
        time: params[:time]
      )
      if event.save
        render json: { result: "Event created", id: event.id }
      else
        render json: { result: "Unable to save event" }
      end
    else
      render json: { result: "Not found." }
    end
  end

  def get_myevents
    user = User.find_by(email: params[:email])
    render json: { events: user.events, profile: user.profile }
  end
end
