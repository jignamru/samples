require 'rest-client'

class BabysitterController < ApplicationController
  respond_to :json

  AUTHENTICATE_URL = 'http://localhost:8080/babysitter/users/authenticate'
  USER_URL         = 'http://localhost:8080/babysitter/users/'

  def index
    user_id = session[:user_id]

    @page = session[:page] if user_id.present?
    Rails.logger.debug("Session page: #{@page}")
    @page ||= 'login'
    Rails.logger.debug("Initial page: #{@page}")
    session[:page] = @page
  end

  ########################################
  #  AJAX POST URLs
  ########################################

  def goto_page
    request_body = JSON.parse(request.body.read)
    page = request_body['page']

    if session[:user_id].present?
      Rails.logger.debug("Saving page to session. Page: #{page}")
      session[:page] = page
    end

    # we don't need to return anything for a successful save
    return render json: {}
  end

  def authenticate
    request_body = JSON.parse(request.body.read)
    Rails.logger.debug("Request body: #{request_body}")

    response = RestClient.post(AUTHENTICATE_URL, request_body.to_json, content_type: :json, accept: :json)
    Rails.logger.debug("Response: #{response}")
    # TODO check the response status code
    response_body = JSON.parse(response.body)

    Rails.logger.debug("Successful login. Resetting session to prepare storage.")
    reset_session

    # Save the user ID to the session; we will use this later
    # TODO we need to save the token from the service as well
    user_id = response_body['userId']
    Rails.logger.debug("User ID: #{user_id}")
    session[:user_id] = user_id

    # we don't need to return anything for a successful authentication
    return render json: { newCSRFToken: form_authenticity_token }
  end

  def add_sitter
    request_body = JSON.parse(request.body.read)
    Rails.logger.debug("Request body: #{request_body}")

    user_id = session[:user_id]
    Rails.logger.debug("User ID: #{user_id}")
    raise "No active session." if user_id.blank?

    add_sitter_url = "#{USER_URL}#{user_id}/sitters"
    Rails.logger.debug("Add sitter URL: #{add_sitter_url}")

    response = RestClient.post(add_sitter_url, request_body.to_json, content_type: :json, accept: :json)
    Rails.logger.debug("Response: #{response}")
    response_body = JSON.parse(response.body)

    return render json: response_body
  end

  def logout
    Rails.logger.debug("Logging user out. Resetting session.")
    reset_session

    # we don't need to return anything for a successful save
    return render json: { newCSRFToken: form_authenticity_token }
  end

  ########################################
  #  AJAX GET URLs
  ########################################

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
