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
        params[:items].each do |item|
          event.items.build(title: item.title, description: item.description)
        end
        render json: { result: "Event created" }
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
