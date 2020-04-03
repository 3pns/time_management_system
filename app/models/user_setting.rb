class UserSetting < ApplicationRecord
  belongs_to :user

  validates :user, :presence => true
  validates_numericality_of :preferred_working_hours_per_day
end
