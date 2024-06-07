require "test_helper"

class UserControllerTest < ActionDispatch::IntegrationTest
  test "should get all users" do
    get users_url, as: :json
    assert_response :success
  end
end
