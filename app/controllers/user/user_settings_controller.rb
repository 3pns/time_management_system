class User::UserSettingsController < User::UserController
  before_action :find_user_settings, :only => [:show, :update]

  # get a user own settings
  def index
    render json: current_user.settings, status: 200
  end

  # update a user own settings
  def create
    settings = current_user.settings
    if settings.update_attributes(model_params)
      render json: settings, status: 200
    else
      render json: settings.errors, status: 422
    end
  end

  # TODO restrict to admins
  def show
    render json: @user_settings, status: 200
  end

  # TODO restrict to admins
  def update
    if @user_settings.update_attributes(model_params)
      render json: @user_settings, status: 200
    else
      render json: @user_settings.errors, status: 422
    end
  end

  private
    def model_params
      params.require(:user_setting).permit!
    end 

    def find_user_settings
      @user_settings = UserSetting.find(params[:id])
    end
end
