class TimeEntrySerializer < ActiveModel::Serializer
  attributes :id, :user_id, :date, :duration, :note, :created_at, :updated_at
end
