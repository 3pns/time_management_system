class ApplicationController < ActionController::API
  include ActionController::MimeResponds

  respond_to :json
  responder :my_application
end
