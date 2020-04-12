class TimeEntryPolicy < ApplicationPolicy
  def index?
    true
  end

  def show?
    true
  end

  def create?
    true
  end

  def update?
    true
  end

  def destroy?
    true
  end

  class Scope < Scope
    def resolve
      if user.has_role?("admin")
        scope.all
      elsif user.has_role?("manager")
        ids = user.subordinates.select(:id).to_a.push(user.id)
        scope.where(user_id: ids)
      elsif user.has_role?("user")
        scope.where(user_id: user.id)
      else
        TimeEntry.none
      end
    end
  end
end
