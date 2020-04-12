class UserPolicy < ApplicationPolicy

  def index?
    user.has_role?("admin") || user.has_role?("manager")
  end

  def show?
    user.has_role?("admin") || user.has_role?("manager")
  end

  def create?
    user.has_role?("admin")
  end

  def update?
    user.has_role?("admin")
  end

  def destroy?
    user.has_role?("admin")
  end

  class Scope < Scope
    def resolve
      scope.all
      if user.has_role?("admin")
        scope.all
      elsif user.has_role?("manager")
        scope.where(manager_id: user.id)
      else 
        User.none
      end
    end
  end
end
