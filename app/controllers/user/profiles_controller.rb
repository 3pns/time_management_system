class User::ProfilesController < User::UserController
  def show
    render json: current_user, serializer: ProfileSerializer, include: ["settings", "roles"], status: 200
    # return current_user
  end

  def update
    return current_user
  end
end
