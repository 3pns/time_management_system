class UserSettingSerializer < ActiveModel::Serializer
  attributes :id, :user_id, :preferred_working_hours_per_day, :preferred_working_hours_per_day_enabled
end
