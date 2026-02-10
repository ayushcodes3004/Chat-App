import { Box } from "@chakra-ui/react";
import { Avatar } from "./ui/avatar";
import { Tooltip } from "./ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
    isLastMessage,
    isSameSender,
    isSameSenderMargin,
    isSameUser,
} from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
    const { user } = ChatState();

    return (
        <ScrollableFeed>
            {messages &&
                messages.map((m, i) => (
                    <Box display="flex" key={m._id}>
                        {(isSameSender(messages, m, i, user._id) ||
                            isLastMessage(messages, i, user._id)) && (
                                <Tooltip content={m.sender.name} positioning={{ placement: "bottom-start" }}>
                                    <Avatar
                                        mt="7px"
                                        mr={1}
                                        size="sm"
                                        cursor="pointer"
                                        name={m.sender.name}
                                        src={m.sender.pic}
                                    />
                                </Tooltip>
                            )}
                        <Box
                            as="span"
                            bg={m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"}
                            ml={isSameSenderMargin(messages, m, i, user._id)}
                            mt={isSameUser(messages, m, i, user._id) ? "3px" : "10px"}
                            borderRadius="20px"
                            padding="5px 15px"
                            maxWidth="75%"
                        >
                            {m.content}
                        </Box>
                    </Box>
                ))}
        </ScrollableFeed>
    );
};

export default ScrollableChat;