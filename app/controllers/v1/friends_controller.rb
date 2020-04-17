# frozen_string_literal: true

class V1::FriendsController < ApplicationController
  def get_friends
    user = User.find_by(email: params[:email])
    if user
      ids = get_array(Friend.select(:sender).where('receiver = (?) AND status = TRUE', user.id), 'sender')
      ids += get_array(Friend.select(:receiver).where('sender = (?)  AND status = TRUE', user.id), 'receiver')
      friends = Profile.where('user_id IN (?)', ids)
      render json: { friends: friends }
    else
      render json: { result: 'Not found.' }
    end
  end

  def all_requests
    user = User.find_by(email: params[:email])
    if user
      ids = get_array(Friend.select(:sender).where('receiver = (?) AND status = TRUE', user.id), 'sender')
      ids += get_array(Friend.select(:receiver).where('sender = (?)  AND status = TRUE', user.id), 'receiver')
      friends = Profile.where('user_id IN (?)', ids)

      id_senders = get_array(Friend.select(:sender).where('receiver = (?) AND status = FALSE', user.id), 'sender')
      id_receivers = get_array(Friend.select(:receiver).where('sender = (?) AND status = FALSE', user.id), 'receiver')
      ids_new = id_senders + id_receivers + ids + [user.id]

      received = Profile.where('user_id IN (?)', id_senders)
      sent = Profile.where('user_id IN (?)', id_receivers)
      new = Profile.where('user_id NOT IN (?)', ids_new)
      render json: { friends: friends, received: received, newRequests: new, sent: sent }
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

  def accept_friend
    receiver = User.find_by(email: params[:email])
    sender = Profile.find(params[:id]).user

    friend = Friend.where('sender = (?) AND receiver = (?)', sender.id, receiver.id).first
    if friend
      friend.update_attribute(:status, true)
      wishgivers = []
      sender.profile.wishes.each do |wish|
        wishgivers.push({ id: wish.id, givers: wish.givers })
      end
      render json: { result: 'Accepted', wishes: sender.profile.wishes, wishgivers: wishgivers }
    else
      render json: { result: 'Realation: not found.' }
    end
  end

  def destroy_relation
    sender = User.find_by(email: params[:email])
    receiver = Profile.find(params[:id]).user

    friend = Friend.where('sender = (?) AND receiver = (?)', sender.id, receiver.id).first
    friend = Friend.where('sender = (?) AND receiver = (?)', receiver.id, sender.id).first unless friend
    if friend
      sender.profile.wishes.each do |wish|
        wish.giver.find_by(friend_id: receiver.id).destroy
      end
      receiver.profile.wishes.each do |wish|
        wish.givers.find_by(friend_id: sender.id).destroy
      end
      friend.destroy
      render json: { result: 'Destroy' }
    else
      render json: { result: 'Realation: not found.' }
    end
  end
end
