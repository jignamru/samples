require 'rest-client'

class BabysitterController < ApplicationController

  def index
    @initial_user_id = '1b4513be-8f5c-4e26-bca1-a8c9f562da14'
    @initial_user_data = JSON.parse(RestClient.get("http://localhost:8080/babysitter/users/#{@initial_user_id}"))
  end
end
