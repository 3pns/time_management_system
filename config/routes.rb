Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations', sessions: 'users/sessions', }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :user do
    resource :profile, only: [:show, :update]
    resources :user_settings, only: [:show, :update]
    resources :time_entries
    resources :users
  end
end
