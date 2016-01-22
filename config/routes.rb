Rails.application.routes.draw do

  get                       'babysitter/index'

  post 'goto_page'       => 'babysitter#goto_page'
  post 'authenticate'    => 'babysitter#authenticate'
  get  'user'            => 'babysitter#user'
  get  'sitters'         => 'babysitter#sitters'
  post 'add_sitter'      => 'babysitter#add_sitter'
  post 'schedule_sitter' => 'babysitter#schedule_sitter'
  post 'logout'          => 'babysitter#logout'

  # You can have the root of your site routed with "root"
  root 'babysitter#index'

end
