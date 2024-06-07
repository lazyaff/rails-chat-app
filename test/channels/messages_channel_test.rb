require "test_helper"

class MessagesChannelTest < ActionCable::Channel::TestCase
  test "subscribes and streams from MessagesChannel" do
    # Simulate a subscription
    subscribe

    # Verify the subscription was successful
    assert subscription.confirmed?

    # Verify the subscription streams from the correct channel
    assert_has_stream "MessagesChannel"
  end
end
