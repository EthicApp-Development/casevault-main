Rails.application.routes.draw do
  get 'users/index'
  get 'users/show'
  get 'users/new'
  get 'users/create'
  get 'users/edit'
  get 'users/update'
  get 'users/destroy'
  # Rutas para usuarios generadas por Devise
  devise_for :users, controllers: { 
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get 'cases/:id', to: 'static/static_cases#show', as: 'case'

  # Rutas del API
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :create, :update, :destroy]
      resources :cases do
        resources :audios, only: [:index, :create, :update, :destroy]
        resources :videos, only: [:index, :create, :update, :destroy]
        resources :documents, only: [:index, :create, :destroy] do
          member do
            get :download_document
          end
        end
      end
    end
  end
  # Ruta para comprobar el estado de la aplicación
  get "up" => "rails/health#show", as: :rails_health_check
end
