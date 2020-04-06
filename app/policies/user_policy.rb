class UserPolicy < ApplicationPolicy

  def index?
    user.has_role?("admin")
  end

  def show?
    user.has_role?("admin")
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
      else
        nil
      end
    end
  end
end