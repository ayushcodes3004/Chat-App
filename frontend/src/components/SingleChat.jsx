import { useState, useEffect } from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box, Text, IconButton, Spinner, Input, Field } from '@chakra-ui/react'
import { LuArrowLeft } from 'react-icons/lu'
import ProfileModal from './miscellaneous/ProfileModal'
import { getSender, getSenderFull } from '../config/ChatLogics'
import UpdateGroupChatModal from './miscellaneous/UpdateGroupModal'
import ScrollableChat from './ScrollableChat'
import axios from 'axios'
import { toaster } from './ui/toaster'

const SingleChat = ({ fetchAgain, setFetchAgain }) => {
    const { user, selectedChat, setSelectedChat } = ChatState();

    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [newMessage, setNewMessage] = useState("");

    const fetchMessages = async () => {
        if (!selectedChat) return;
        try {
            setLoading(true);
            const config = {
                headers: {
                    Authorization: `Bearer ${user.token}`,
                },
            };
            const { data } = await axios.get(`/api/message/${selectedChat._id}`, config);
            // console.log(data);
            setMessages(data);
            setLoading(false);
        } catch (error) {
            toaster.create({
                title: "Error Occured!",
                description: "Failed to Load the Messages",
                type: "error",
                duration: 5000,
                closable: true,
            });
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, [selectedChat]);

    const sendMessage = async (event) => {
        // Logic to send message
        if (event.key === "Enter" && newMessage) {
            try {
                // API call to send message
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${user.token}`,
                    },
                };
                setNewMessage("");
                const { data } = await axios.post("/api/message", {
                    content: newMessage,
                    chatId: selectedChat._id,
                }, config);
                // console.log(data);
                setMessages([...messages, data]);
            } catch (error) {
                toaster.create({
                    title: "Error Occured!",
                    description: "Failed to Load the Messages",
                    type: "error",
                    duration: 5000,
                    closable: true,
                });
            }
        }
    }

    const typingHandler = (event) => {
        setNewMessage(event.target.value);
        // Logic to handle typing indicator
    }

    return (
        <>
            {selectedChat ? (
                <>
                    <Text
                        fontSize={{ base: "28px", md: "30px" }}
                        pb={3}
                        px={2}
                        w="100%"
                        fontFamily="Work sans"
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                    >
                        <IconButton
                            display={{ base: "flex", md: "none" }}
                            onClick={() => setSelectedChat("")}
                            aria-label="Back"
                        >
                            <LuArrowLeft />
                        </IconButton>
                        {!selectedChat.isGroupChat ? (
                            <>
                                {getSender(user, selectedChat.users)}
                                <ProfileModal
                                    user={getSenderFull(user, selectedChat.users)}
                                />
                            </>
                        ) : (
                            <>
                                {selectedChat.chatName.toUpperCase()}
                                <UpdateGroupChatModal
                                    fetchAgain={fetchAgain}
                                    setFetchAgain={setFetchAgain}
                                />
                            </>
                        )}
                    </Text>
                    <Box
                        display="flex"
                        flexDirection="column"
                        justifyContent="flex-end"
                        p={3}
                        bg="#E8E8E8"
                        w="100%"
                        h="100%"
                        borderRadius="lg"
                        overflowY="hidden"
                    >
                        {loading ? (
                            <Spinner
                                size="xl"
                                w={20}
                                h={20}
                                alignSelf="center"
                                margin="auto"
                            />
                        ) : (
                            <div className="messages">
                                <ScrollableChat messages={messages} />
                            </div>
                        )}

                        <Field.Root
                            onKeyDown={sendMessage}
                            required
                            mt={3}
                        >
                            <Input
                                variant="subtle"
                                bg="#E0E0E0"
                                placeholder="Enter a message.."
                                value={newMessage}
                                onChange={typingHandler}
                            />
                        </Field.Root>
                    </Box>
                </>
            ) : (
                <Box display="flex" alignItems="center" justifyContent="center" h="100%">
                    <Text fontSize="3xl" pb={3} fontFamily="Work sans">
                        Click on a user to start chatting
                    </Text>
                </Box>
            )}
        </>
    );
}

export default SingleChat
