require 'rails_helper'

RSpec.describe TimeEntry, type: :model do
  subject{ TimeEntry.new }

  it { should validate_presence_of(:user) }
  it { should validate_presence_of(:date) }
  it { should validate_presence_of(:duration) }
  it { should validate_length_of(:note).is_at_most(255) }
end

RSpec.describe TimeEntry, "max duration", type: :model do
  before(:each) do
    @user = FactoryBot.create(:user)
  end

  it "should create time entry" do
    time_entry = FactoryBot.create(:time_entry, duration: 23*3600, user: @user)
  end

  it "should create time entries aggregating  exactly to 24h" do
    FactoryBot.create(:time_entry, duration: 23*3600)
    time_entry = FactoryBot.create(:time_entry, duration: 3600, user: @user)
  end

  it "should throw error when creating time entries aggregating to at least 1 second more than 24h" do
    FactoryBot.create(:time_entry, duration: 23*3600)
    time_entry = FactoryBot.create(:time_entry, duration: 3600, user: @user)
  end
end
