class CreateTimeEntries < ActiveRecord::Migration[6.0]
  def change
    create_table :time_entries do |t|
      t.references :user, index: true, foreign_key: { on_delete: :cascade }
      t.date :date
      t.bigint :duration
      t.string :note
      t.timestamps
    end
  end
end
