class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  has_one :settings, class_name: "UserSetting"
  has_many :time_entries
  has_many :subordinates, foreign_key: "manager_id", class_name: "User"

  belongs_to :manager, class_name: "User", optional: true

  validates :email, :presence => true
  validate :manager_cannot_be_itself

  private
    def manager_cannot_be_itself
      errors.add(:manager, "cannot be itself") if id != nil and manager_id == id
    end
end
