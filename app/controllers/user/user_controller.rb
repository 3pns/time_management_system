class User::UserController < ApplicationController
  before_action :authenticate_user!

  def renew
    head 201
  end
end
