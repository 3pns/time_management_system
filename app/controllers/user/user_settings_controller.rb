class User::UserSettingsController < User::UserController
  before_action :find_user_settings, :only => [:show, :update]

  def show
    render json: @user_settings, status: 200
  end

  def update
    if @user_settings.update(model_params)
      render json: @user_settings, status: 200
    else
      render json: @user_settings, serializer: ErrorSerializer, status: 422
    end
  end

  private
    def model_params
      params[:user_setting] = params[:user_setting].except(:user_id) if params[:action] == "update"
      params[:user_setting] = params[:user_setting].except(:id)
      return params.require(:user_setting).permit!

    end 

    def find_user_settings
      @user_settings = policy_scope(UserSetting).find_by_user_id(params[:user_id])
      authorize @user_settings
    end
end
