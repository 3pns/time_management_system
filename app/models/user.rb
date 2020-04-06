class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable, :recoverable, :validatable,
         :jwt_authenticatable, jwt_revocation_strategy: Devise::JWT::RevocationStrategies::Null

  after_save :create_settings

  has_one :settings, class_name: "UserSetting"
  has_many :time_entries
  has_many :subordinates, foreign_key: "manager_id", class_name: "User"
  has_many :user_roles
  has_many :roles, through: :user_roles

  belongs_to :manager, class_name: "User", optional: true

  validates :email, :presence => true
  validate :manager_cannot_be_itself

  default_scope { includes(:settings) }

  def roles_a
    self.roles.map{|role| role.name}
  end

  def has_role?(role)
    self.roles_a.include?(role)
  end

  private
    def manager_cannot_be_itself
      errors.add(:manager, "cannot be itself") if id != nil and manager_id == id
    end

    def create_settings
      if self.settings == nil
        UserSetting.create(user: self)
      end
    end
end
