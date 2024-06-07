require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new(name: "Test User")
  end

  test "user should be valid" do
    assert @user.valid?
  end

  test "user's name should be present" do
    @user.name = "     "
    assert_not @user.valid?
  end
end
