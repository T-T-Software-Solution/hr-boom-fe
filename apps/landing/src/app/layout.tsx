import { Flex, Loader, MantineProvider } from "@mantine/core";
import { ModalsProvider } from "@mantine/modals";
import { Notifications } from '@mantine/notifications';
import { ChatProvider } from "@tt-ss-hr/shared-ui";
import { Suspense } from "react";
import { theme } from "../theme";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const chatConfig = {
    agentAvatarImageSrc: '/images/ai-avatar.jpeg',
    agentName: 'น้อง BKK',
    userName: 'คุณ',
  }

  return (
    <MantineProvider theme={theme}>
      <ModalsProvider
        labels={{ confirm: 'บันทึก', cancel: 'ยกเลิก' }}
        modalProps={{ centered: true }}
      >
        <Notifications position="bottom-center" />
        <Suspense
          fallback={
            <Flex justify="center" align="center" w="100%">
              <Loader size="md" />
            </Flex>
          }
        >
          <ChatProvider config={chatConfig}>
            {children}
          </ChatProvider>
        </Suspense>
      </ModalsProvider>
    </MantineProvider>
  );
}