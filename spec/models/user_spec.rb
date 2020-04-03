require 'rails_helper'

RSpec.describe TimeEntry, type: :model do
  subject{ TimeEntry.new }

  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:date) }
  it { should validate_presence_of(:duration) }
end



RSpec.describe User, "roles", type: :model do
  before(:each) do
    @user = FactoryBot.create(:user)
  end

  it "TODO" do
  end
end
