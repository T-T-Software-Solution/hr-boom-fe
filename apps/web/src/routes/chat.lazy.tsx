import { Bubble, Prompts, Sender, Welcome, useXAgent, useXChat } from '@ant-design/x';
import { ActionIcon, Avatar, Button, Card, Container, Group, Stack, Text, Title } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconCloudUpload, IconFlame, IconLink } from '@tabler/icons-react';
import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';
import ttRobot from '../assets/tt-robot.jpg';
import { theme } from '../theme';

const sleep = () => new Promise((resolve) => setTimeout(resolve, 1000));

let mockSuccess = false;

export const Route = createLazyFileRoute('/chat')({
    component: Chat,
})

function Chat() {
    const [content, setContent] = React.useState('');
    const [open, setOpen] = React.useState(false);

    // Agent for request
    const [agent] = useXAgent({
        request: async ({ message }, { onSuccess, onError }) => {
            await sleep();

            mockSuccess = !mockSuccess;

            if (mockSuccess) {
                onSuccess(`Mock success return. You said: ${message}`);
            }

            onError(new Error('Mock request failed'));
        },
    });

    // Chat messages
    const { onRequest, messages } = useXChat({
        agent,
        requestPlaceholder: 'Waiting...',
        requestFallback: 'Mock failed return. Please try again later.',
    });

    return (
        <Container p="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <Stack gap="md">
                    <Welcome
                        variant='borderless'
                        icon={<Avatar src={ttRobot} alt="น้องทีที" size="lg" />}
                        title={(() => {
                            const hour = new Date().getHours();
                            let greeting = '';
                            if (hour >= 5 && hour < 12) {
                                greeting = "สวัสดีตอนเช้าค่ะ ✨ วันนี้อากาศดีนะคะ";
                            } else if (hour >= 12 && hour < 17) {
                                greeting = "สวัสดีตอนกลางวันค่ะ 🌞 รับประทานอาหารกลางวันแล้วหรือยังคะ?";
                            } else if (hour >= 17 && hour < 22) {
                                greeting = "สวัสดีตอนเย็นค่ะ 🌅 วันนี้เป็นอย่างไรบ้างคะ?";
                            } else {
                                greeting = "สวัสดีตอนดึกค่ะ 🌙 ดึกแล้วนะคะ อย่าลืมพักผ่อนด้วยนะคะ";
                            }

                            return <Title order={4} ff={theme.fontFamily} mb={0}>{greeting}</Title>;
                        })()}
                        description={<Text ff={theme.fontFamily}>ฉันคือน้องทีที ผู้ช่วยที่แสนดีของคุณ...</Text>}
                    />

                    <Prompts
                        title={<Text ff={theme.fontFamily}>คุณต้องการให้ฉันช่วยเหลืออะไรไหมคะ?</Text>}
                        items={[
                            {
                                key: '1',
                                label:
                                    <Group gap="xs" align="center">
                                        <IconFlame color="#FF4D4F" />
                                        <Text fw="bold">คำถามยอดนิยม</Text>
                                    </Group>
                                ,
                                children: [
                                    {
                                        key: '1-1',
                                        description: "ใครหล่อที่สุดในบริษัท?",
                                    },
                                    {
                                        key: '1-2',
                                        description: "ใครชอบแอบอู้ในเวลาทำงาน?",
                                    },
                                    {
                                        key: '1-3',
                                        description: "ทำไมถึงไม่มีใครหล่อเท่เท่าคุณ?",
                                    },
                                ],
                            },
                        ]}
                        wrap
                        styles={{
                            item: {
                                flex: 'none',
                                width: 'calc(30% - 6px)',
                                backgroundImage: "linear-gradient(137deg, #fff1f1 0%, #ffe4e4 100%)",
                                border: 0,
                            },
                            subItem: {
                                background: 'rgba(255,255,255,0.45)',
                                border: '1px solid #FFF',
                            },
                        }}
                        onItemClick={(info) => {
                            notifications.show({
                                color: 'green',
                                message: `You clicked a prompt: ${info.data.key}`,
                            });
                        }}
                    />

                    <Bubble.List
                        roles={{
                            ai: {
                                placement: 'start',
                                avatar: <Avatar src={ttRobot} alt="น้องทีที" size="md" />,
                                header: <Text size="sm" c="primary.6" ff={theme.fontFamily}>น้องทีที</Text>,
                                typing: { step: 5, interval: 20 },
                                style: {
                                    maxWidth: 600,
                                },
                            },
                            local: {
                                placement: 'end',
                                avatar: <Avatar color="primary" size="md">คุณ</Avatar>,
                                // header: <Text size="sm" c="primary.6" ff={theme.fontFamily} style={{ alignItems: 'flex-end' }}>คุณ</Text>,
                            },
                        }}
                        style={{ maxHeight: 300 }}
                        items={messages.map(({ id, message, status }) => ({
                            key: id,
                            loading: status === 'loading',
                            role: status === 'local' ? 'local' : 'ai',
                            content: message,
                        }))}
                    />
                    <Sender
                        header={
                            <Sender.Header title="Upload Sample" open={open} onOpenChange={setOpen}>
                                <Stack align="center" gap="small" style={{ marginBlock: theme.spacing?.lg }}>
                                    <IconCloudUpload style={{ fontSize: '4em' }} />
                                    <Title order={5} style={{ margin: 0 }}>
                                        Drag file here (just demo)
                                    </Title>
                                    <Text c="secondary">
                                        Support pdf, doc, xlsx, ppt, txt, image file types
                                    </Text>
                                    <Button
                                        onClick={() => {
                                            notifications.show({
                                                color: 'green',
                                                message: 'Mock select file',
                                            });
                                        }}
                                    >
                                        Select File
                                    </Button>
                                </Stack>
                            </Sender.Header>
                        }
                        prefix={
                            <ActionIcon
                                variant='transparent'
                                c="gray.6"
                                aria-label='Upload file'
                                onClick={() => {
                                    setOpen(!open);
                                }}
                            >
                                <IconLink />
                            </ActionIcon>
                        }
                        loading={agent.isRequesting()}
                        value={content}
                        onChange={setContent}
                        placeholder="พิมพ์ข้อความที่คุณต้องการถาม..."
                        style={{
                            fontFamily: theme.fontFamily,
                        }}
                        onSubmit={(nextContent) => {
                            onRequest(nextContent);
                            setContent('');
                        }}
                    />
                </Stack>
            </Card>
        </Container>
    );
}