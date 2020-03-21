Rails.application.routes.draw do
  namespace :v1, defaults: { format: 'json' } do
    get 'signin', to: 'sessions#sign_in'
    get 'signout', to: 'sessions#sign_out'
    get 'autosignin', to: 'sessions#auto_sign_in'
    get 'signup', to: 'users#create'
    get 'setprofile', to: 'profiles#create'
    get 'getprofile', to: 'profiles#show'
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end

  root 'static#index'
end
