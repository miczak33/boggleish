Rails.application.routes.draw do
  namespace :api do
    resources :boards do
      resources :find_input
    end
  end
end
