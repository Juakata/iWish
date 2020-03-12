Rails.application.routes.draw do
  namespace :v1, defaults: { format: 'json' } do
    get 'sessions', to: 'sessions#sign_in'
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  root 'static#index'
end
