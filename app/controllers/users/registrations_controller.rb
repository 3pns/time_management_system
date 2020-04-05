class Users::RegistrationsController < Devise::RegistrationsController
  include Recaptcha::Adapters::ControllerMethods

  before_action :configure_sign_up_params, only: [:create]

  def create
    if configatron.recaptcha_enabled
      recaptcha = params[:user][:recaptcha]
      params[:user].delete(:recaptcha)
      build_resource(sign_up_params)
      if verify_recaptcha(model: resource, response: recaptcha)
        resource.save
      end
    else
      build_resource(sign_up_params)
      resource.save
    end
    yield resource if block_given?
    if resource.persisted?
      if resource.active_for_authentication?
        set_flash_message! :notice, :signed_up
        sign_up(resource_name, resource)
        respond_with resource, location: after_sign_up_path_for(resource)
      else
        set_flash_message! :notice, :"signed_up_but_#{resource.inactive_message}"
        expire_data_after_sign_in!
        respond_with resource, location: after_inactive_sign_up_path_for(resource)
      end
    else
      clean_up_passwords resource
      set_minimum_password_length
      respond_with resource
    end
  end

  protected

  def configure_sign_up_params
    devise_parameter_sanitizer.permit(:sign_up, keys: [:first_name, :last_name, :recaptcha])
  end
end
