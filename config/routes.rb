Rails.application.routes.draw do
  namespace :v1, defaults: { format: 'json' } do
    get 'signin', to: 'sessions#sign_in'
    get 'signout', to: 'sessions#sign_out'
    get 'autosignin', to: 'sessions#auto_sign_in'
    get 'signup', to: 'users#create'
    get 'setprofile', to: 'profiles#create'
    get 'getprofile', to: 'profiles#show'
    get 'createwish', to: 'wishes#create'
    get 'getwishes', to: 'wishes#pull_wishes'
    get 'updatewish', to: 'wishes#update_wish'
    get 'deletewish', to: 'wishes#delete_wish'
    get 'allrequests', to: 'friends#all_requests'
    get 'getfriends', to: 'friends#pull_friends'
    get 'addfriend', to: 'friends#add_friend'
    get 'acceptfriend', to: 'friends#accept_friend'
    get 'destroyrelation', to: 'friends#destroy_relation'
    get 'getgivers', to: 'givers#pull_givers'
    get 'addgiver', to: 'givers#add_giver'
    get 'removegiver', to: 'givers#remove_giver'
    get 'createevent', to: 'events#create_event'
    get 'getmyevents', to: 'events#pull_myevents'
    get 'createitem', to: 'items#create_item'
    get 'getitems', to: 'items#pull_items'
    get 'getallevents', to: 'events#pull_allevents'
    get 'createeventguest', to: 'event_guests#create_event_guest'
    get 'pullcomingevents', to: 'events#pull_comingevents'
    get 'pullguests', to: 'event_guests#pull_guests'
    get 'pullalleventsfriend', to: 'events#pull_allevents_friend'
    get 'deleteguest', to: 'event_guests#delete_guest'
    get 'deleteevent', to: 'events#delete_event'
    get 'createitemguest', to: 'item_guests#create_item_guest'
    get 'pullitemguests', to: 'item_guests#pull_guests'
    get 'deleteguestitem', to: 'item_guests#delete_guest'
  end

  get '*page', to: 'static#index', constraints: ->(req) do
    !req.xhr? && req.format.html?
  end
  get '/service-worker.js' => "service_worker#service_worker"
  get '/manifest.json' => "service_worker#manifest"
  root 'static#index'
end
