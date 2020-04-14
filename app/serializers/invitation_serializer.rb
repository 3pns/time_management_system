class InvitationSerializer < ActiveModel::Serializer
  attributes :id, :email, :roles, :invite_as_subordinate, :invitation_accepted_at, :invited_by_id, :created_at, :updated_at
  belongs_to :invited_by, serializer: ProfileSerializer
end
