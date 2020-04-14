class ApplicationController < ActionController::API
  include ActionController::MimeResponds
  include Pagy::Backend
  include Pundit
  
  respond_to :json
  responder :my_application

  def secret_key_base 
    ENV["SECRET_KEY_BASE"] 
  end 
end
