class CreateUserSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :user_settings do |t|
      t.references :user, index: true, foreign_key: true, unique: true
      t.bigint :preferred_working_hours_per_day
      t.timestamps
    end
  end
end
