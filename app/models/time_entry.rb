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
end
