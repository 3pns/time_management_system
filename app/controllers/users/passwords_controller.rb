# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  # GET /resource/password/new
  # def new
  #   super
  # end

  # POST /resource/password
  # request password email
  def create
    if configatron.recaptcha_enabled
      recaptcha = params[:user][:recaptcha]
      params[:user].delete(:recaptcha)
      if verify_recaptcha(response: recaptcha)
        self.resource = resource_class.send_reset_password_instructions(resource_params)
        yield resource if block_given?
      else
        render json: {errors: [{recaptcha: "reCaptcha is invalid, please try again"}]}, status: 422 and return
      end
    else
      self.resource = resource_class.send_reset_password_instructions(resource_params)
      yield resource if block_given?
    end
    if successfully_sent?(resource)
      respond_with({}, location: after_sending_reset_password_instructions_path_for(resource_name))
    else
      respond_with(resource)
    end
  end

  # GET /resource/password/edit?reset_password_token=abcdef
  # def edit
  #   super
  # end

  # PUT /resource/password
  # reset password with token
  def update
    if configatron.recaptcha_enabled
      recaptcha = params[:user][:recaptcha]
      params[:user].delete(:recaptcha)
      if verify_recaptcha(response: recaptcha)
        self.resource = resource_class.reset_password_by_token(resource_params)
        yield resource if block_given?
      else
        render json: {errors: {recaptcha: ["reCaptcha is invalid, please try again"] }}, status: 422 and return
      end
    else
      self.resource = resource_class.reset_password_by_token(resource_params)
      yield resource if block_given?
    end
    if resource.errors.empty?
      resource.unlock_access! if unlockable?(resource)
      if Devise.sign_in_after_reset_password
        flash_message = resource.active_for_authentication? ? :updated : :updated_not_active
        set_flash_message!(:notice, flash_message)
        resource.after_database_authentication
        sign_in(resource_name, resource)
      else
        set_flash_message!(:notice, :updated_not_active)
      end
      respond_with resource, location: after_resetting_password_path_for(resource)
    else
      set_minimum_password_length
      respond_with resource
    end
  end

  # protected

  # def after_resetting_password_path_for(resource)
  #   super(resource)
  # end

  # The path used after sending reset password instructions
  # def after_sending_reset_password_instructions_path_for(resource_name)
  #   super(resource_name)
  # end
end
