class User::UsersController < ApplicationController
  before_action :find_user, :only => [:show, :edit, :update, :destroy]

  def index
    @q = policy_scope(User)
    @q = @q.search_by_fields(params[:search_by_fields]) if params[:search_by_fields]
    @q = @q.ransack(params[:q])
    @pagy, @users = pagy(@q.result)
    render json: { 
      data: @users,
      pagination: pagy_metadata(@pagy) 
    }, status: 200
  end

  def create
    @user = User.new model_params
    if @user.save
      role = Role.find_by_name("user")
      @user.roles << role
      render json: @user, serializer: UserSerializer, status: 201
    else
      render json: @user, serializer: ErrorSerializer, status: 422
    end
  end

  def show
    render json: @user, serializer: UserSerializer, status: 200
  end

  def update
    roles = Role.where(name: params[:user][:roles])
    params[:user] = params[:user].except(:roles)
    if @user.update_attributes(model_params)
      @user.roles = roles
      @user.save()
      render json: @user, serializer: UserSerializer, status: 200
    else
      render json: @user, serializer: ErrorSerializer, status: 422
    end
  end

  def destroy
    if @user.destroy
      head 204
    else
      render json: @user, serializer: ErrorSerializer, status: 422
    end
  end

  private
    def model_params
      return params.require(:user).permit(:first_name, :last_name, :email, :roles, :manager_id, :password, :password_confirmation)
    end

    def find_user
      @user = policy_scope(User).find(params[:id])
      authorize @user
    end
end
