class CreateUserSettings < ActiveRecord::Migration[6.0]
  def change
    create_table :user_settings do |t|
      t.references :user, index: true, unique: true, foreign_key: { on_delete: :cascade }
      t.bigint :preferred_working_hours_per_day, default: 0, null: false
      t.boolean :preferred_working_hours_per_day_enabled, default: false, null: false
      t.timestamps
    end
  end
end
