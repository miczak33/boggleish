Rails.application.routes.draw do
  namespace :api do
    resources :boards
  end
end
