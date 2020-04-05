class User::TimeEntriesController < User::UserController
  before_action :find_time_entry, :only => [:show, :edit, :update, :destroy]

  # TODO add role base filtering with pundit
  def index
    @disable_pagination = params[:disable_pagination]
    @q = TimeEntry.ransack(params[:q])
    if @disable_pagination
      render json: { 
        data: @q.result,
        pagination: {} 
      }, status: 200
    else
      @pagy, @time_entries = pagy(@q.result)
      render json: { 
        data: @time_entries,
        pagination: pagy_metadata(@pagy) 
      }, status: 200
    end
  end

  def new 
    @time_entry = TimeEntry.new
  end

  def create
    @time_entry = TimeEntry.new model_params
    if @time_entry.save
      render json: @time_entry, status: 201
    else
      render json: @time_entry.errors, status: 422
    end

  end

  def show
    render json: @time_entry, status: 200
  end

  def update
    if @time_entry.update_attributes(model_params)
      render json: @time_entry, status: 200
    else
      render json: @time_entry.errors, status: 422
    end
  end

  def destroy
    if @time_entry.destroy
      head 200
    else
      render json: @time_entry.errors, status: 422
    end
  end

  private
    def model_params
      params.require(:time_entry).permit!
    end

    def find_time_entry
      @time_entry = TimeEntry.find(params[:id])
    end
end
