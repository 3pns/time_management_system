class User::ProfilesController < User::UserController
  def show
    render json: current_user, serializer: ProfileSerializer, include: ["settings", "roles"], status: 200
  end

  def update
    if current_user.update(model_params)
      render json: current_user, serializer: ProfileSerializer, include: ["settings", "roles"], status: 200
    else
      render json: current_user, serializer: ErrorSerializer, status: 422
    end
  end

  def update_password
    if current_user.update(password_params)
      render json: current_user, serializer: ProfileSerializer, include: ["settings", "roles"], status: 200
    else
      render json: current_user, serializer: ErrorSerializer, status: 422
    end
  end

  private
    def model_params
      params.require(:profile).permit(:first_name, :last_name, :email)
    end

  def password_params
    # NOTE: Using `strong_parameters` gem
    params.require(:user).permit(:password, :password_confirmation)
  end
end
