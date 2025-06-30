Rails.application.routes.draw do
  get 'users/index'
  get 'users/show'
  get 'users/new'
  get 'users/create'
  get 'users/edit'
  get 'users/update'
  get 'users/destroy'

  # Rutas para usuarios generadas por Devise
  get 'current_user', to: 'current_user#index'
  devise_for :users, path: '', path_names: {
    sign_in: 'login',
    sign_out: 'logout',
    registration: 'signup'
  },
  controllers: {
    sessions: 'users/sessions',
    registrations: 'users/registrations'
  }

  get 'cases/:id', to: 'static/static_cases#show', as: 'case'

  # Rutas del API
  namespace :api do
    namespace :v1 do
      resources :users, only: [:index, :show, :create, :update, :destroy]
      resources :cases do
        collection do
          get :user_cases, to: 'cases#get_user_cases'
          get :saved_cases, to: 'cases#get_saved_cases'
          get :search, to: 'cases#get_searched_cases' 
          post :save_case, to: 'cases#save_case' 
          delete :unsave_case, to: 'cases#unsave_case' 
          get :saved, to: 'cases#saved_case'
          get :smart_home_feed
        end
        resources :tags, only: [:index, :destroy] do
          collection do
            post :add_tag
          end
        end
        resources :comments, only: [:index, :create, :destroy] do
          resource :vote, only: [:create, :destroy]
        end
        resources :audios, only: [:index, :create, :update, :destroy]
        resources :videos, only: [:index, :create, :update, :destroy]
        resources :documents, only: [:index, :create, :destroy] do
          member do
            get :download_document
          end
        end
        post 'rate', to: 'case_ratings#create_or_update'
      end
      resources :tags, only: [:all_tags, :create, :destroy, :index] do
        collection do
          get :all_tags
          get :searched_tags, to: 'tags#get_searched_tags'
        end
      end
      resources :channels do
        collection do
          get '/', to: 'channels#show'
          post '/', to: 'channels#create'
          get 'public', to: 'channels#public_channels'
          get 'my_channels', to: 'channels#my_channels'
          post 'add_case', to: 'channels#add_case'
          delete 'remove_member', to: 'channels#remove_member'
        end
        member do
          delete 'remove_case/:case_id', to: 'channels#remove_case'
          post 'add_members', to: 'channels#update_members'
          get 'cases', to: 'channels#cases'
        end
      end
    end
  end
  
  # Ruta para comprobar el estado de la aplicación
  get "up" => "rails/health#show", as: :rails_health_check
end
