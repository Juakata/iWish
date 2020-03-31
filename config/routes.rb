Rails.application.routes.draw do
  namespace :v1, defaults: { format: 'json' } do
    get 'signin', to: 'sessions#sign_in'
    get 'signout', to: 'sessions#sign_out'
    get 'autosignin', to: 'sessions#auto_sign_in'
    get 'signup', to: 'users#create'
    get 'setprofile', to: 'profiles#create'
    get 'getprofile', to: 'profiles#show'
    get 'createwish', to: 'wishes#create'
    get 'getwishes', to: 'wishes#get_wishes'
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  get '/service-worker.js' => "service_worker#service_worker"
  get '/manifest.json' => "service_worker#manifest"
  root 'static#index'
end
