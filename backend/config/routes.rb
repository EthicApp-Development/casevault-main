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

  # Rutas del API
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :create, :update, :destroy]
      resources :cases do
        resources :tags, only: [:index, :destroy] do
          collection do
            post :add_tag
          end
        end
        resources :audios, only: [:index, :create, :update, :destroy]
        resources :videos, only: [:index, :create, :update, :destroy]
        resources :documents, only: [:index, :create, :destroy] do
          member do
            get :download_document
          end
        end
      end
      resources :tags, only: [:all_tags, :create, :destroy] do
        collection do
          get :all_tags
        end
      end
    end
  end
  # Ruta para comprobar el estado de la aplicación
  get "up" => "rails/health#show", as: :rails_health_check
end
