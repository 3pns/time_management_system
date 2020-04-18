class User::InvitationsController < User::UserController
  before_action :find_invitation, :only => [:show, :update, :destroy]

  def index
    @q = policy_scope(Invitation.includes(:invited_by))
    @q = @q.search_by_fields(params[:search_by_fields]) if params[:search_by_fields]
    @q = @q.ransack(params[:q])
    @pagy, @invitations = pagy(@q.result)
    render json: { 
      data: ActiveModel::Serializer::CollectionSerializer.new(@invitations, :scope => current_user),
      pagination: pagy_metadata(@pagy) 
    }, status: 200
  end

  def create
    @invitation = Invitation.new model_params
    @invitation.invited_by = current_user
    if @invitation.save
      @invitation.reload
      render json: @invitation, serializer: InvitationSerializer, status: 201
      InvitationMailer.with(invitation_id: @invitation.id).new_invitation_email.deliver_later
    else
      render json: @invitation, serializer: ErrorSerializer, status: 422
    end
  rescue ActiveRecord::RecordNotUnique
    render json: {errors: { email:[ "not unique"] } }, status: 422
  end

  def show
    render json: @invitation, serializer: InvitationSerializer, status: 200
  end

  def update
    if @invitation.update_attributes(model_params)
      @invitation.save()
      render json: @invitation, serializer: InvitationSerializer, status: 200
    else
      render json: @invitation, serializer: ErrorSerializer, status: 422
    end
  end

  def destroy
    if @invitation.destroy
      head 204
    else
      render json: @invitation, serializer: ErrorSerializer, status: 422
    end
  end

  private
    def model_params
      return params.require(:invitation).permit(:email, { roles:[] }, :invite_as_subordinate)
    end 

    def find_invitation
      @invitation = policy_scope(Invitation).find(params[:id])
      authorize @invitation
    end
end
