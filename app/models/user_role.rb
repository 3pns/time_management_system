class UserRole < ApplicationRecord
  belongs_to :user
  belongs_to :role

  before_destroy :manager_integrity
  around_destroy :manager_integrity
  before_save :manager_integrity

  private
    # https://github.com/rails/rails/issues/29078
    def manager_integrity
      if self.user.subordinates.count > 0 and self.role.name == "manager"
        errors[:base] << "cannot revoke manager role from a user who have subordinates"
        return false
      end
    end
end
