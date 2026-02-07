import { Button, Box, Text } from '@chakra-ui/react';
import { Tooltip } from '@/components/ui/tooltip';
import { Menu } from "@chakra-ui/react"
import { Icon } from "@chakra-ui/react"
import { FaBell, FaSearch, FaChevronDown } from 'react-icons/fa'
import React from 'react'
import { Avatar, Portal } from "@chakra-ui/react"
import { ChatState } from "../../Context/ChatProvider.jsx"

const SideDrawer = () => {
    const [search, setSearch] = React.useState("");
    const [searchResult, setSearchResult] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [loadingChat, setLoadingChat] = React.useState(false);
    const { user } = ChatState();
    return (
        <>
            <Box display="flex" justifyContent="space-between" alignItems="center" bg="white" w="100%" p="5px 10px 5px 10px" borderWidth="5px">
                <Tooltip content="Search Users to chat" positioning={{ placement: 'bottom-end' }}>
                    <Button variant='ghost' _focus={{ outline: "none", boxShadow: "none" }}>
                        <Icon as={FaSearch} />
                        <Text display={{ base: "none", md: "flex" }} px={4}>Search User</Text>
                    </Button>
                </Tooltip>
                <Text fontSize="2xl" fontFamily="Work sans">Chat App</Text>
                <div>
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Button p={1} bg="white" _focus={{ outline: "none", boxShadow: "none" }}>
                                <Icon as={FaBell} fontSize="2xl" m={1} color="black" />
                            </Button>
                        </Menu.Trigger>
                        {/* <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value="new-txt">New Text File</Menu.Item>
                                    <Menu.Item value="new-file">New File...</Menu.Item>
                                    <Menu.Item value="new-win">New Window</Menu.Item>
                                    <Menu.Item value="open-file">Open File...</Menu.Item>
                                    <Menu.Item value="export">Export</Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal> */}
                    </Menu.Root>
                    <Menu.Root>
                        <Menu.Trigger asChild>
                            <Button variant='ghost' _focus={{ outline: "none", boxShadow: "none" }}>
                                {/* <Text display={{ base: "none", md: "flex" }} px={4}>User Name</Text> */}
                                <Avatar.Root size="sm" cursor="pointer">
                                    <Avatar.Fallback name={user?.name} />
                                    <Avatar.Image src={user?.pic} />
                                </Avatar.Root>
                                <Icon as={FaChevronDown} />
                            </Button>
                        </Menu.Trigger>
                        <Portal>
                            <Menu.Positioner>
                                <Menu.Content>
                                    <Menu.Item value="new-txt">My Profile</Menu.Item>
                                    <Menu.Item value="new-file">Logout</Menu.Item>
                                </Menu.Content>
                            </Menu.Positioner>
                        </Portal>
                    </Menu.Root>
                </div>
            </Box>
        </>
    )
}

export default SideDrawer
