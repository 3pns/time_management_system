class InvitationPolicy < ApplicationPolicy

  def index?
    user.has_role?("manager") || user.has_role?("admin")
  end

  def create?
    user.has_role?("manager") || user.has_role?("admin")
  end

  def show?
    user.has_role?("manager") || user.has_role?("admin")
  end

  def update?
    user.has_role?("admin")
  end

  def destroy?
    user.has_role?("admin")
  end

  class Scope < Scope
    def resolve
      if user.has_role?("admin")
        scope.all
      elsif user.has_role?("manager")
        ids = user.subordinates.select(:id).to_a.push(user.id)
        scope.where(invited_by_id: user.id)
      elsif user.has_role?("user")
        scope.where(invited_by_id: user.id)
      else
        Invitation.none
      end
    end
  end
end
