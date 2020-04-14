class Invitation < ApplicationRecord
  before_create :verify_roles_granted

  belongs_to :invited_by, class_name: "User"

  validates_numericality_of :invited_by_id

  validates :email, :presence => true
  validates :invited_by, :presence => true
  validate :roles_values

  private
    def verify_roles_granted
      if not self.invited_by.has_role?("admin")
        self.roles = ["user"]
      end
      existing_roles = Role.all.map{|role| role.name}
      self.roles.each do |role|
        errors[:roles] << "role does not exist" if not existing_roles.include?(role)
      end
    end

    def roles_values
       errors.add(:roles, "roles must be an array") if !roles.is_a?(Array) 
       errors.add(:roles, "allowed values are user manager or admin") if roles.detect{|d| !(["user", "manager", "admin"]).include?(d)} 
    end
end
