# frozen_string_literal: true

class V1::ItemsController < ApplicationController
  def create_item
    event = Event.find(params[:event])
    item = event.items.build(title: params[:title], description: params[:description])
    item.save
    render json: { result: 'Item created' }
  end

  def pull_items
    event = Event.find(params[:event])
    send = []
    event.items.each do |item|
      guests = []
      item.item_guests.each do |item_guest|
        guests.push(item_guest.profile)
      end
      send.push({
          id: item.id,
          title: item.title,
          description: item.description,
          people: guests,
        })
    end
    render json: send
  end
end
