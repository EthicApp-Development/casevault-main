Rails.application.routes.draw do

  devise_for :users, controllers: { 
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }
  namespace :api do
    namespace :v1 do
      resources :cases
    end
  end

  get "up" => "rails/health#show", as: :rails_health_check

  # root "posts#index"
end
