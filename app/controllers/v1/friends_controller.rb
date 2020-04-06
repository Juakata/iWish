# frozen_string_literal: true

class V1::FriendsController < ApplicationController
  def get_friends
    user = User.find_by(email: params[:email])
    if user
      ids = Friend.select(:sender).where('receiver = (?) AND status = TRUE', user.id).to_a
      ids += Friend.select(:receiver).where('sender = (?)  AND status = TRUE', user.id).to_a
      friends = Profile.where('user_id IN (?)', ids)
      render json: { friends: friends }
    else
      render json: { result: 'Not found.' }
    end
  end

  def get_array (obj, option)
    arr = []
    if option == 'receiver'
      obj.each do |e|
        arr.push(e[:receiver])
      end
    else
      obj.each do |e|
        arr.push(e[:sender])
      end
    end
    arr
  end

  def all_requests
    user = User.find_by(email: params[:email])
    if user
      id_senders = get_array(Friend.select(:sender).where('receiver = (?) AND status = FALSE', user.id), 'sender')
      id_receivers = get_array(Friend.select(:receiver).where('sender = (?) AND status = FALSE', user.id), 'receiver')
      ids = id_senders + id_receivers + [user.id]
      received = Profile.where('user_id IN (?)', id_senders)
      sent = Profile.where('user_id IN (?)', id_receivers)
      new = Profile.where('user_id NOT IN (?)', ids)
      render json: { received: received, sent: sent, new: new }
    else
      render json: { result: 'Not found.' }
    end
  end

  def add_friend
    sender = User.find_by(email: params[:email])
    profile = Profile.find(params[:id])
    if profile
      receiver = profile.user
      if sender && receiver
        friend = Friend.new(sender: sender, receiver: receiver)
        if friend.save
          render json: { result: 'Created.' }
        else
          render json: { result: friend.errors }
        end
      else
        render json: { result: 'Not found.' }
      end
    else
      render json: { result: 'Not found.' }
    end
  end
end