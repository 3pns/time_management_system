class User::UserSettingsController < User::UserController
  before_action :find_user_settings, :only => [:show, :update]

  def show
    render json: @user_settings, status: 200
  end

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
      @user_settings = policy_scope(UserSetting).find(params[:id])
      authorize @user_settings
    end
end
