require 'rails_helper'

RSpec.describe UserSetting, type: :model do
  subject{ UserSetting.new }

  it { should validate_presence_of(:user) }
end
