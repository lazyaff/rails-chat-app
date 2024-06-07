require "test_helper"

class MessageTest < ActiveSupport::TestCase
  include ActionCable::TestHelper

  def setup
    @user = User.create(name: "Test User")
    @message = Message.new(body: "Hello World", user: @user)
  end

  test "message should be valid" do
    assert @message.valid?
  end

  test "message's body should be present" do
    @message.body = "     "
    assert_not @message.valid?
  end

  test "user should be present" do
    @message.user = nil
    assert_not @message.valid?
  end

  test "should broadcast message after create" do
    assert_difference "Message.count", 1 do
      @message.save
    end
    assert_broadcast_on("MessagesChannel", {message: @message.as_json(include: :user)})
  end
end
