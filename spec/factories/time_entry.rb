FactoryBot.define do
  factory :time_entry do
    user
    date { "01/01/2020" }
    duration { 3600 }
    sequence :note do |n|
      "note_#{n}"
    end
  end
end
