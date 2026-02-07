import { createContext, useContext, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";


const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));
        return userInfo;
    });

    const history = useHistory();

    useEffect(() => {
        if (!user) {
            history.push("/");
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [history])

    return (
        <ChatContext.Provider value={{ user, setUser }}>
            {children}
        </ChatContext.Provider>
    )
}

export const ChatState = () => {
    return useContext(ChatContext);
}


export default ChatProvider;