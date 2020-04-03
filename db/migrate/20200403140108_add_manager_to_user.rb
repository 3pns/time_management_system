class AddManagerToUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :manager_id, :bigint, foreign_key: true, index: true, null: true
    add_foreign_key :users, :users, column: :manager_id
  end
end
