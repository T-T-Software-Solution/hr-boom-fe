import { Container } from '@mantine/core';
import { createLazyFileRoute } from '@tanstack/react-router';
import { Chat } from '../components/chat/chat';

export const Route = createLazyFileRoute('/chat')({
    component: ChatPage,
})

function ChatPage() {

    return (
        <Chat height="60vh" width="100%" />
    )
}