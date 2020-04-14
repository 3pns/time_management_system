class ProfileSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :email, :roles, :permissions, :created_at, :updated_at
  has_one :settings
  belongs_to :manager, serializer: ProfileSerializer

  def roles
    object.roles_a
  end

  def permissions
    classes = [TimeEntry, User, UserSetting, Invitation]
    permissions = { }                             
    classes.each do |klass|
      obj = klass.new
      policy =  Pundit.policy(object, obj)  
      policy.public_methods(false).sort.each do |m|
        result = policy.send m                    
        permissions["#{klass}.#{m}"] = result     
      end
    end 
    return permissions
  end
end
