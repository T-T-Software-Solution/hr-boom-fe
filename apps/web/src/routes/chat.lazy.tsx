import { createLazyFileRoute } from '@tanstack/react-router';
import { Chat } from '@tt-ss-hr/shared-ui';

export const Route = createLazyFileRoute('/chat')({
    component: ChatPage,
})

function ChatPage() {

    return (
        <Chat height="60vh" width="100%" />
    )
}