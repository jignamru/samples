require 'rest-client'

class BabysitterController < ApplicationController
  respond_to :json

  AUTHENTICATE_URL = 'http://localhost:8080/babysitter/users/authenticate'
  USER_URL         = 'http://localhost:8080/babysitter/users/'

  def index
    #session[:user_id] = @current_user.id
  end

  def authenticate
    request_body = JSON.parse(request.body.read)
    Rails.logger.debug("Request body: #{request_body}")

    response = RestClient.post(AUTHENTICATE_URL, request_body.to_json, content_type: :json, accept: :json)
    Rails.logger.debug("Response: #{response}")
    # TODO check the response status code
    response_body = JSON.parse(response.body)

    # Save the user ID to the session; we will use this later
    # TODO we need to save the token from the service as well
    user_id = response_body['userId']
    Rails.logger.debug("User ID: #{user_id}")
    session[:user_id] = user_id

    return render json: response_body
  end

  def user
    user_id = session[:user_id]

    # TODO error/500 if user_id.blank?
    response = RestClient.get("#{USER_URL}#{user_id}")
    Rails.logger.debug("Response: #{response}")

    return render json: response.body
  end

  def sitters
    user_id = session[:user_id]

    # TODO error/500 if user_id.blank?
    response = RestClient.get("#{USER_URL}#{user_id}/sitters")
    Rails.logger.debug("Response: #{response}")

    return render json: response.body
  end

end
