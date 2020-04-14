class CreateInvitations < ActiveRecord::Migration[6.0]
  def change
    enable_extension 'pgcrypto' unless extension_enabled?('pgcrypto')
    create_table :invitations do |t|
      t.uuid       :invitation_token, null: false, default: 'gen_random_uuid()'
      t.string     :email, null: false, default: ""
      t.string     :roles, array: true, default: []
      t.boolean    :invite_as_subordinate, default: false, null: false
      t.datetime   :invitation_accepted_at, default: nil
      t.references :invited_by, foreign_key: {to_table: :users}, on_delete: :nullify
      t.index      :invitation_token, unique: true
      t.index      :email, unique: true
      t.timestamps
    end
  end
end
