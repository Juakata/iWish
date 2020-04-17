# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def get_array(obj, option)
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
end
