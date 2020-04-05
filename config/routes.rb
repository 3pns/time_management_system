Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :user do
    resources :time_entries
    resources :users
    resources :user_settings, only: [:index, :create, :show, :update]
  end
end
