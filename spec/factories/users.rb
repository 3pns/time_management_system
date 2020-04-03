FactoryBot.define do
  factory :user do
    sequence :email do |n|
      "user_#{n}@example.com"
    end
    sequence :first_name do |n|
      "first_name_#{n}"
    end
    sequence :last_name do |n|
      "last_name_#{n}"
    end
    password { "monkey123" }
    password_confirmation { "monkey123" }
  end
end
