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
    time = Time.new
    date = "#{time.year}-#{time.month}-#{time.day}"
    user = User.find_by(email: params[:email])
    events = user.events.where('date >= (?)', date)
    render json: { events: events, profile: user.profile }
  end

  def pull_allevents
    time = Time.new
    date = "#{time.year}-#{time.month}-#{time.day}"
    user = User.find_by(email: params[:email])
    no_ids = get_array(EventGuest.select(:event_id).where('profile_id = (?)', user.profile.id), :event_id)
    ids = get_array(Friend.select(:sender).where('receiver = (?) AND status = TRUE', user.id), :sender)
    ids += get_array(Friend.select(:receiver).where('sender = (?)  AND status = TRUE', user.id), :receiver)
    events = Event.where('user_id IN (?) AND id NOT IN (?) AND date >= (?)', ids, no_ids, date)
    render json: { events: events }
  end

  def pull_allevents_friend
    time = Time.new
    date = "#{time.year}-#{time.month}-#{time.day}"
    friend = User.find(params[:id])
    events = Event.where('user_id = (?) AND date >= (?)', friend.id, date)
    render json: { events: events }
  end

  def pull_comingevents
    time = Time.new
    date = "#{time.year}-#{time.month}-#{time.day}"
    user = User.find_by(email: params[:email])
    ids = get_array(EventGuest.select(:event_id).where('profile_id = (?)', user.profile.id), :event_id)
    events = Event.where('id IN (?) AND date >= (?)', ids, date)
    render json: { events: events }
  end

  def delete_event
    event = Event.find(params[:id])
    event&.destroy
  end
end
