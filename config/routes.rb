Rails.application.routes.draw do
  devise_for :users, controllers: { registrations: 'users/registrations', sessions: 'users/sessions', passwords: 'users/passwords' }
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html

  namespace :user do
    resource :profile, only: [:show, :update] do
      post :update_password
    end
    resources :time_entries
    resources :users do
      resource :user_settings, only: [:show, :update]
      post :update_password
    end
  end
end
