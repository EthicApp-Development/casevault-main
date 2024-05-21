Rails.application.routes.draw do
  # Rutas para usuarios generadas por Devise
  devise_for :users, controllers: { 
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  # Rutas del API
namespace :api do
  namespace :v1 do
    resources :cases do
      resources :audios, only: [:index, :create, :update, :destroy]
      resources :documents, only: [:index, :create, :destroy] do
        member do
          get :download_document
        end
      end
      resources :videos, only: [:index, :create, :update, :destroy]
    end
  end
end
  # Ruta para comprobar el estado de la aplicación
  get "up" => "rails/health#show", as: :rails_health_check
end
