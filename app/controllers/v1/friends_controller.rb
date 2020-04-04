# frozen_string_literal: true

class V1::FriendsController < ApplicationController
  def get_friends
    user = User.find_by(email: params[:email])
    if user
      ids = Friends.select(:sender).where('receiver = (?) AND status = TRUE', user.id)
      ids += Friends.select(:receiver).where('sender = (?)  AND status = TRUE', user.id)

      render json: { friends: ids }
    else
      render json: { result: 'Not found.' }
    end
  end

  def all_requests
    user = User.find_by(email: params[:email])
    if user
      id_senders = Friend.select(:sender).where('receiver = (?) AND status = FALSE', user.id).to_a
      id_receivers = Friend.select(:receiver).where('sender = (?) AND status = FALSE', user.id).to_a
      ids = id_senders + id_receivers + [user.id]
      received = Profile.where('user_id IN (?)', id_senders)
      sent = Profile.where('user_id IN (?)', id_receivers)
      new = Profile.where('user_id NOT IN (?)', ids)
      render json: { received: received, sent: sent, new: new }
    else
      render json: { result: 'Not found.' }
    end
  end

  def send_invitation
    sender = User.find_by(email: params[:sender])
    receiver = User.find_by(email: params[:receiver])
    if sender && receiver
      friend = Friend.new(sender: sender.id, receiver: receiver.id)
      if friend.save
        render json: { result: 'Created.' }
      else
        render json: { result: 'No Created.' }
      end
    else
      render json: { result: 'Not found.' }
    end
  end
end
