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
    render json: event.items
  end
end
