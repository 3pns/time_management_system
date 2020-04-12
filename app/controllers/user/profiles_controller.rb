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

  private
    def model_params
      params.require(:profile).permit(:first_name, :last_name)
    end 
end
