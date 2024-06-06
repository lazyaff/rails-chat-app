import { useState, useEffect } from "react";
import "bootstrap-icons/font/bootstrap-icons.css";

// websocket connection
const ws = new WebSocket("ws://localhost:3000/cable");

// messages interface
interface Messages {
    id: number;
    body: string;
    user_id: number;
    user: {
        name: string;
    };
    created_at: string;
}

interface User {
    id: number;
    name: string;
}

function App() {
    const [messages, setMessages] = useState<Messages[]>([]);
    const [guid, setGuid] = useState("");
    const [users, setUsers] = useState<User[] | null>(null);
    const [userId, setUserId] = useState<number | null>();
    const messagesContainer = document.getElementById("messages");

    // websocket events
    ws.onopen = () => {
        setGuid(Math.random().toString(36).substring(2, 15));
        ws.send(
            JSON.stringify({
                command: "subscribe",
                identifier: JSON.stringify({
                    id: guid,
                    channel: "MessagesChannel",
                }),
            })
        );
    };

    ws.onmessage = (e) => {
        const data = JSON.parse(e.data);
        if (data.type === "ping") return;
        if (data.type === "welcome") return;
        if (data.type === "confirm_subscription") return;

        const message = data.message.message;
        setMessages([...messages, message]);
        if (!messagesContainer) return;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    };

    // fetch users
    useEffect(() => {
        const fetchUsers = async () => {
            const response = await fetch("http://localhost:3000/users");
            const data = await response.json();
            setUsers(data);
        };
        fetchUsers();
    }, []);

    // fetch initial messages
    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch("http://localhost:3000/messages");
            const data = await response.json();
            setMessages(data);
            if (!messagesContainer) return;
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        };
        fetchMessages();
    }, [messagesContainer]);

    // scroll to bottom on new message
    useEffect(() => {
        if (!messagesContainer) return;
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }, [messages, messagesContainer]);

    // send message
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as typeof e.target & {
            message: { value: string };
        };
        const body = target.message.value;
        target.message.value = "";

        await fetch("http://localhost:3000/messages", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ body, user_id: userId }),
        });
    };

    return (
        <div className="flex flex-col bg-gradient-to-r from-cyan-400 to-cyan-600 p-2 md:p-4 min-h-screen max-h-screen">
            {(!users && (
                <div className="flex flex-col justify-center items-center h-screen align-middle">
                    <div className="spinner">
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                        <div></div>
                    </div>
                    <p className="mt-10 font-bold text-3xl text-white">
                        Loading
                    </p>
                </div>
            )) || (
                <>
                    {(!userId && (
                        <div className="flex flex-col justify-center items-center h-screen align-middle">
                            <div className="bg-white p-4 rounded">
                                <p className="mb-4 font-bold text-center text-lg">
                                    Select a user
                                </p>
                                <div>
                                    {users?.map((user) => (
                                        <button
                                            className="bg-blue-500 hover:bg-blue-700 mx-2 px-4 py-2 rounded text-white"
                                            onClick={() => {
                                                setUserId(user.id);
                                            }}
                                            key={user.id}
                                        >
                                            {user.name}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )) || (
                        <>
                            <div
                                className="flex justify-between bg-white p-4 align-middle"
                                style={{ height: "80px" }}
                            >
                                <div className="flex justify-center items-center bg-gray-300 rounded-full w-12 h-12">
                                    <i className="text-3xl text-white bi bi-people-fill"></i>
                                </div>
                                <div className="text-center">
                                    <p className="font-bold text-lg">
                                        Rails Chat App
                                    </p>
                                    <p>3 members</p>
                                </div>
                                <div className="flex items-center">
                                    <button
                                        onClick={() => setUserId(null)}
                                        className="bg-red-500 hover:bg-red-700 px-4 py-2 rounded font-bold text-white"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </div>
                            <div
                                className="bg-contain pb-2"
                                style={{ backgroundImage: "url(/bg.jpg)" }}
                            ></div>
                            <div
                                className="flex-grow justify-between bg-contain p-2 overflow-auto l"
                                style={{ backgroundImage: "url(/bg.jpg)" }}
                                id="messages"
                            >
                                <div>
                                    {messages.length > 0
                                        ? messages.map((message) => {
                                              if (message.user_id == userId) {
                                                  return (
                                                      <div
                                                          className="flex justify-end"
                                                          key={message.id}
                                                      >
                                                          <div className="bg-teal-200 shadow mb-2 p-2 rounded-xl max-w-56 md:max-w-xl break-words">
                                                              <p>
                                                                  {message.body}
                                                              </p>
                                                          </div>
                                                      </div>
                                                  );
                                              } else {
                                                  return (
                                                      <div
                                                          className="flex justify-start"
                                                          key={message.id}
                                                      >
                                                          <div className="bg-white shadow mb-2 p-2 rounded-xl max-w-56 md:max-w-xl break-words">
                                                              <p className="font-bold">
                                                                  {
                                                                      message
                                                                          .user
                                                                          .name
                                                                  }
                                                              </p>
                                                              <p>
                                                                  {message.body}
                                                              </p>
                                                          </div>
                                                      </div>
                                                  );
                                              }
                                          })
                                        : null}
                                </div>
                            </div>
                            <div
                                style={{ backgroundImage: "url(/bg.jpg)" }}
                                className="bg-contain p-2"
                            >
                                <form
                                    onSubmit={handleSubmit}
                                    className="flex items-center"
                                >
                                    <input
                                        className="flex-grow border-gray-300 mr-2 px-4 py-2 border focus:border-teal-500 rounded-lg messageInput focus:outline-none"
                                        type="text"
                                        name="message"
                                        placeholder="Type your message..."
                                        autoComplete="off"
                                    />
                                    <button
                                        className="bg-teal-500 hover:bg-teal-600 px-4 py-2 rounded-lg font-semibold text-white messageButton focus:outline-none"
                                        type="submit"
                                    >
                                        <i className="bi bi-send-fill"></i>
                                    </button>
                                </form>
                            </div>
                        </>
                    )}
                </>
            )}
        </div>
    );
}

export default App;
