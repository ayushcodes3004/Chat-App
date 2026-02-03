import React, { useEffect, useState } from 'react'
import axios from 'axios'

const ChatPage = () => {
    const [chats, setChats] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data } = await axios.get("/api/chat");
                if (Array.isArray(data)) {
                    setChats(data);
                } else {
                    console.error("API did not return an array:", data);
                }
            } catch (error) {
                console.error("Error fetching chats:", error);
            }
        };
        fetchData();
    }, []);


  return (
    <div>
        {chats.map((chat) => (
            <div key={chat._id}>{chat.chatName}</div>
        ))}
    </div>
  )
}

export default ChatPage
