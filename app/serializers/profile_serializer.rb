class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :roles, :created_at, :updated_at
  has_one :settings
  belongs_to :manager, serializer: ProfileSerializer

  def roles
    object.roles_a
  end
end
