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
        render json: { result: 'Event created', id: event.id }
      else
        render json: { result: 'Unable to save event' }
      end
    else
      render json: { result: 'Not found.' }
    end
  end

  def pull_myevents
    user = User.find_by(email: params[:email])
    render json: { events: user.events.order(date: :asc), profile: user.profile }
  end

  def pull_allevents
    user = User.find_by(email: params[:email])
    ids = get_array(Friend.select(:sender).where('receiver = (?) AND status = TRUE', user.id), 'sender')
    ids += get_array(Friend.select(:receiver).where('sender = (?)  AND status = TRUE', user.id), 'receiver')
    events = Event.where('user_id IN (?)', ids).order(date: :asc)
    render json: { events: events }
  end
end
