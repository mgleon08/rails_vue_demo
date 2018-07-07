Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  root :to => "application#index"
  match "*path", to: "application#index", format: false, via: :get
end
