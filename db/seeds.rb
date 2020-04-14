# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

populate_dummy_data = ENV['PDD']
p "update seed data"
user_role = Role.find_or_create_by(name: 'user')
manager_role = Role.find_or_create_by(name: 'manager')
admin_role = Role.find_or_create_by(name: 'admin')


# dummy data for development and demo
if populate_dummy_data
  p "populating dummy data"
  user = User.find_or_initialize_by(email: 'user@example.com')
  user.update_attributes(
    first_name: "user_first_name", 
    last_name: "user_last_name",
    password: 'monkey123',
    password_confirmation: 'monkey123'
  )
  user.roles << user_role rescue ActiveRecord::RecordNotUnique

  user = User.find_or_initialize_by(email: 'manager@example.com')
  user.update_attributes(
    first_name: "manager_first_name", 
    last_name: "manager_last_name",
    password: 'monkey123',
    password_confirmation: 'monkey123'
  )
  user.roles << manager_role rescue ActiveRecord::RecordNotUnique

  user = User.find_or_initialize_by(email: 'admin@example.com')
  user.update_attributes(
    first_name: "admin_first_name", 
    last_name: "admin_last_name",
    password: 'monkey123',
    password_confirmation: 'monkey123'
  )
  user.roles << admin_role rescue ActiveRecord::RecordNotUnique

  (1..200).each do |x|
    user = User.find_or_initialize_by(email: "user#{x}@example.com")
    user.update_attributes(
      first_name: "user#{x}_first_name", 
      last_name: "user#{x}_last_name",
      password: 'monkey123',
      password_confirmation: 'monkey123'
    )
    user.roles << user_role rescue ActiveRecord::RecordNotUnique
    (1..100).each do |y|
      date = rand(Date.civil(2020, 1, 1)..Date.civil(2020, 5, 31)).to_s
      hours = rand(0..10000)
      TimeEntry.create(user: user, date: date, duration: hours, note: "note #{y}" ) rescue Exception
    end
  end
end

