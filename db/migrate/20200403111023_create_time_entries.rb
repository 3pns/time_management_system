class CreateTimeEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :time_entries do |t|
      t.references :user, index: true, foreign_key: { on_delete: :cascade }
      t.date :date, default: -> { 'NOW()' }
      t.bigint :duration, default: 0
      t.string :note, default: ""
      t.timestamps
    end
  end
end
