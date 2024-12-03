import { Attachments, type AttachmentsProps, Bubble, Prompts, type PromptsProps, Sender, Welcome, XProvider, useXAgent, useXChat } from '@ant-design/x';
import { ActionIcon, Avatar, Card, Container, Group, Indicator, Loader, Stack, Text } from '@mantine/core';
import { IconCloudUpload, IconFlame, IconLink, IconSparkles } from '@tabler/icons-react';
import { createLazyFileRoute } from '@tanstack/react-router';
import React from 'react';
import ttRobot from '../assets/tt-robot.jpg';
import { theme } from '../theme';

let mockSuccess = false;

export const Route = createLazyFileRoute('/chat')({
    component: Chat,
})

function Chat() {
    const [content, setContent] = React.useState('');
    const [headerOpen, setHeaderOpen] = React.useState(false);

    const senderRef = React.useRef<HTMLDivElement>(null);
    const [attachedFiles, setAttachedFiles] = React.useState<AttachmentsProps['items']>([]);

    // Agent for request
    const [agent] = useXAgent({
        request: async ({ message }, { onSuccess, onError }) => {
            mockSuccess = !mockSuccess;

            if (mockSuccess) {
                onSuccess(`ฉันยังไม่มีคำตอบสำหรับคำถาม "${message}" ค่ะ`);
            }

            onError(new Error('Mock request failed'));
        },
    });

    // Chat messages
    const { onRequest, messages } = useXChat({
        agent,
        requestPlaceholder: 'กำลังประมวลผล...',
        requestFallback: 'เกิดข้อผิดพลาดในการประมวลผล กรุณาลองใหม่อีกครั้ง',
    });

    const onSubmit = (nextContent: string) => {
        if (!nextContent) return;
        onRequest(nextContent);
        setContent('');
    };

    const onPromptsItemClick: PromptsProps['onItemClick'] = (info) => {
        onRequest(info.data.description as string);
    };

    return (
        <Container p="md">
            <Card shadow="sm" padding="lg" radius="md" withBorder>
                <XProvider direction="ltr">
                    <Stack gap="md" justify='flex-start' align='stretch' h={600} style={{ flex: 1 }}>
                        {
                            messages.length < 1 && (
                                <>
                                    <Welcome
                                        variant='borderless'
                                        icon={<Avatar src={ttRobot} alt="น้องทีที" size="lg" />}
                                        title={(() => {
                                            const hour = new Date().getHours();
                                            if (hour >= 5 && hour < 12) {
                                                return "สวัสดีตอนเช้าค่ะ ✨ วันนี้อากาศดีนะคะ";
                                            }
                                            if (hour >= 12 && hour < 17) {
                                                return "สวัสดีตอนกลางวันค่ะ 🌞 รับประทานอาหารกลางวันแล้วหรือยังคะ?";
                                            }
                                            if (hour >= 17 && hour < 22) {
                                                return "สวัสดีตอนเย็นค่ะ 🌅 วันนี้เป็นอย่างไรบ้างคะ?";
                                            }

                                            return "สวัสดีตอนดึกค่ะ 🌙 ดึกแล้วนะคะ อย่าลืมพักผ่อนด้วยนะคะ";
                                        })()}
                                        description="ฉันคือน้องทีที ผู้ช่วยที่แสนดีของคุณ..."
                                        styles={{
                                            title: {
                                                fontFamily: theme.fontFamily,
                                            },
                                            description: {
                                                fontFamily: theme.fontFamily,
                                            },
                                        }}
                                    />

                                    <Prompts
                                        title="คุณต้องการให้ฉันช่วยเหลืออะไรไหมคะ?"
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
                                            {
                                                key: '2',
                                                label:
                                                    <Group gap="xs" align="center">
                                                        <IconSparkles color="#FFA500" />
                                                        <Text fw="bold">กำลังมองหาไอเดียใหม่ใช่ไหม?</Text>
                                                    </Group>
                                                ,
                                                children: [
                                                    {
                                                        key: '1-1',
                                                        description: "ช่วยฉันหาไอเดียในการทำโปรเจกต์เกี่ยวกับ AI ทีสิ",
                                                    },
                                                    {
                                                        key: '1-2',
                                                        description: "แนะนำสถานที่ท่องเที่ยวที่น่าสนใจในกรุงเทพฯ",
                                                    },
                                                ],
                                            },
                                        ]}
                                        styles={{
                                            title: {
                                                fontFamily: theme.fontFamily,
                                            },
                                            item: {
                                                fontFamily: theme.fontFamily,
                                                flex: 'none',
                                                width: '270px',
                                                backgroundImage: "linear-gradient(137deg, #fff5e6 0%, #ffe7e7 100%)",
                                                border: 0,
                                            },
                                            subItem: {
                                                fontFamily: theme.fontFamily,
                                                background: 'rgba(255,255,255,0.45)',
                                                border: '1px solid #FFF',
                                            },
                                        }}
                                        onItemClick={onPromptsItemClick}
                                    />

                                </>
                            )
                        }

                        <Bubble.List
                            autoScroll
                            roles={{
                                ai: {
                                    placement: 'start',
                                    avatar: <Avatar src={ttRobot} alt="น้องทีที" size="md" />,
                                    header: 'น้องทีที',
                                    typing: { step: 5, interval: 20 },
                                    loadingRender: () => <Loader color="primary.6" size="sm" />,
                                    variant: 'outlined',
                                    style: {
                                        maxWidth: 600,
                                    },
                                    styles: {
                                        header: {
                                            fontFamily: theme.fontFamily,
                                        },
                                    },
                                },
                                local: {
                                    placement: 'end',
                                    avatar: <Avatar color="primary" size="md">คุณ</Avatar>,
                                    variant: 'outlined',
                                    typing: false,
                                    styles: {
                                        content: {
                                            color: theme.colors?.primary?.[6],
                                            borderColor: theme.colors?.primary?.[1],
                                        }
                                    }
                                },
                            }}
                            style={{ flex: 1 }}
                            items={messages.map(({ id, message, status }) => ({
                                key: id,
                                loading: status === 'loading',
                                typing: status !== 'local',
                                role: status === 'local' ? 'local' : 'ai',
                                content: message,
                            }))}
                        />
                        <Sender
                            header={
                                <Sender.Header
                                    title="Attachments"
                                    open={headerOpen}
                                    onOpenChange={setHeaderOpen}
                                    styles={{
                                        content: {
                                            padding: 0,
                                        },
                                    }}
                                >
                                    <Attachments
                                        // Mock not real upload file
                                        beforeUpload={() => false}
                                        items={attachedFiles}
                                        onChange={({ fileList }) => setAttachedFiles(fileList)}
                                        placeholder={(type) =>
                                            type === 'drop'
                                                ? {
                                                    title: 'Drop file here',
                                                }
                                                : {
                                                    icon: <IconCloudUpload />,
                                                    title: 'Upload files',
                                                    description: 'Click or drag files to this area to upload',
                                                }
                                        }
                                        getDropContainer={() => senderRef.current}
                                    />
                                </Sender.Header>
                            }
                            prefix={
                                <Indicator
                                    inline
                                    processing
                                    color="red"
                                    label={attachedFiles?.length ?? ''}
                                    size={16}
                                    disabled={attachedFiles && attachedFiles?.length < 1 || headerOpen}
                                >
                                    <ActionIcon
                                        variant='transparent'
                                        c="gray.6"
                                        aria-label='Upload file'
                                        onClick={() => {
                                            setHeaderOpen(!headerOpen);
                                        }}
                                    >
                                        <IconLink />
                                    </ActionIcon>
                                </Indicator>


                            }
                            loading={agent.isRequesting()}
                            value={content}
                            onChange={setContent}
                            placeholder="พิมพ์ข้อความที่คุณต้องการถาม..."
                            styles={{
                                input: {
                                    fontFamily: theme.fontFamily,
                                },
                            }}
                            onSubmit={onSubmit}
                            allowSpeech
                        />
                    </Stack>
                </XProvider>
            </Card>
        </Container>
    );
}