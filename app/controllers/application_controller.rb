# frozen_string_literal: true

class ApplicationController < ActionController::Base
  def get_array(obj, option)
    arr = [-1]
    obj.each do |e|
      arr.push(e[option])
    end
    arr
  end
end
