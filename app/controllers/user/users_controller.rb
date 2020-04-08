class User::UsersController < ApplicationController
  before_action :find_user, :only => [:show, :edit, :update, :destroy]

  def index
    @q = policy_scope(User).ransack(params[:q])
    @pagy, @users = pagy(@q.result)
    render json: { 
      data: @users,
      pagination: pagy_metadata(@pagy) 
    }, status: 200
  end

  def create
    @user = User.new model_params
    if @user.save
      render json: @user, status: 201
    else
      render json: @user.errors, status: 422
    end
  end

  def show
    render json: @user, status: 200
  end

  def update
    if @user.update_attributes(model_params)
      render json: @user, status: 200
    else
      render json: @user.errors, status: 422
    end
  end

  def destroy
    if @user.destroy
      head 204
    else
      render json: @user.errors, status: 422
    end
  end

  private
    def model_params
      params.require(:user).permit!
    end

    def find_user
      @user = policy_scope(User).find(params[:id])
      authorize @user
    end
end
