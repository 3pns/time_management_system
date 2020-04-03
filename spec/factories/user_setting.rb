FactoryBot.define do
  factory :user_setting do
    user
    preferred_working_hours_per_day { 25200 }
  end
end
