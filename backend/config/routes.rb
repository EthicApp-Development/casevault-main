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
        resources :documents, only: [:index, :create] do
          member do
            get :download_document
          end
        end
      end
      resources :images
      resources :users
    end
  end
  # Ruta para comprobar el estado de la aplicación
  get "up" => "rails/health#show", as: :rails_health_check

end
