import { Button, CloseButton, Dialog, Portal, IconButton, Text, Image } from "@chakra-ui/react";
import { LuEye } from "react-icons/lu";
import { useState } from "react";

const ProfileModal = ({ user, children }) => {
    const [open, setOpen] = useState(false);

    return (
        <Dialog.Root size="lg" placement="center" open={open} onOpenChange={(e) => setOpen(e.open)}>
            <Dialog.Trigger asChild>
                {children ? (
                    <span>{children}</span>
                ) : (
                    <IconButton variant="ghost" aria-label="View Profile">
                        <LuEye />
                    </IconButton>
                )}
            </Dialog.Trigger>
            <Portal>
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content height="410px">
                        <Dialog.Header
                            fontSize="40px"
                            fontFamily="Work sans"
                            display="flex"
                            justifyContent="center"
                        >
                            <Dialog.Title>{user.name}</Dialog.Title>
                        </Dialog.Header>
                        <Dialog.Body
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Image
                                borderRadius="full"
                                boxSize="150px"
                                src={user.pic}
                                alt={user.name}
                            />
                            <Text
                                fontSize={{ base: "28px", md: "30px" }}
                                fontFamily="Work sans"
                            >
                                Email: {user.email}
                            </Text>
                        </Dialog.Body>
                        <Dialog.Footer>
                            <Button onClick={() => setOpen(false)}>Close</Button>
                        </Dialog.Footer>
                        <Dialog.CloseTrigger asChild>
                            <CloseButton size="sm" />
                        </Dialog.CloseTrigger>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Portal>
        </Dialog.Root>
    );
};

export default ProfileModal;
