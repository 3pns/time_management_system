class TimeEntry < ApplicationRecord
  belongs_to :user

  validates :user, :presence => true
  validates :date, :presence => true
  validates :duration, :presence => true
  validates :note, :presence => true

  validates_numericality_of :user_id
  validates_date :date
  validates_numericality_of :duration
  validates_length_of :note, maximum: 255

  validate :aggregated_user_daily_duration_less_than_24h
  
  private
    def aggregated_user_daily_duration_less_than_24h
      aggregated_user_daily_duration = TimeEntry.where(user: user, date: date).where.not(id: id).sum(:duration)
      my_duration = duration.nil? ? 0 : duration
      aggregated_user_daily_duration += my_duration
      errors.add(:duration, "aggregated user daily duration must be less than 24h") if aggregated_user_daily_duration > 86400
    end
end
