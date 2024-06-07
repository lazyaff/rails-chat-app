class Message < ApplicationRecord
    belongs_to :user

    validates :body, presence: true
    validates :user_id, presence: true

    after_create_commit { broadcast_message }

    private

    def broadcast_message 
        ActionCable.server.broadcast("MessagesChannel", {
            message: self.as_json(include: :user)
        })
    end
end
