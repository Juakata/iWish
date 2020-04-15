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
    get 'updatewish', to: 'wishes#update_wish'
    get 'deletewish', to: 'wishes#delete_wish'
    get 'allrequests', to: 'friends#all_requests'
    get 'getfriends', to: 'friends#get_friends'
    get 'addfriend', to: 'friends#add_friend'
    get 'acceptfriend', to: 'friends#accept_friend'
    get 'destroyrelation', to: 'friends#destroy_relation'
    get 'getgivers', to: 'givers#get_givers'
    get 'addgiver', to: 'givers#add_giver'
    get 'removegiver', to: 'givers#remove_giver'
    get 'createevent', to: 'events#create_event'
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  get '/service-worker.js' => "service_worker#service_worker"
  get '/manifest.json' => "service_worker#manifest"
  root 'static#index'
end
