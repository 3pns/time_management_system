require 'rails_helper'

RSpec.describe User, type: :model do
  subject{ User.new }

  it { should have_one :settings }
  it { should have_many :time_entries }
  it { should have_many :subordinates }

  it { should belong_to(:manager).without_validating_presence }
end

RSpec.describe User, "manager", type: :model do
  before(:each) do
    @user = FactoryBot.create(:user)
    @manager = FactoryBot.create(:user)
  end

  it "should allow to add a manager to a user" do
    @user.manager = @manager
    expect { @user.save() }.not_to raise_error
  end

  it "should prevent adding itself as a manager" do
    @manager.manager = @manager
    expect(@manager.save()).to be false
    expect(@manager.reload.manager_id).to be nil
  end
end

RSpec.describe User, "roles", type: :model do
  before(:each) do
    @user = FactoryBot.create(:user)
  end

  it "TODO" do
  end
end
