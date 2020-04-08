class CreateUserRoles < ActiveRecord::Migration[6.0]
  def change
    create_table :user_roles do |t|
      t.references :user, index: true, foreign_key: { on_delete: :cascade }
      t.references :role, index: true, foreign_key: { on_delete: :cascade }
      t.timestamps
    end
    add_index :user_roles, [:user_id,:role_id], unique: true
  end
end
