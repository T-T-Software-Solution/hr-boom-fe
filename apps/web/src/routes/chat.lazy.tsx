import { Attachments, type AttachmentsProps, Bubble, Conversations, type ConversationsProps, type PromptProps, Prompts, Sender, Welcome, XProvider, useXAgent, useXChat } from '@ant-design/x';
import type { BubbleListProps } from '@ant-design/x/es/bubble/BubbleList';
import type { Conversation } from '@ant-design/x/es/conversations';
import type { MessageInfo } from '@ant-design/x/es/useXChat';
import { ActionIcon, Avatar, Button, Card, Container, Group, Indicator, Loader, Stack, Text } from '@mantine/core';
import { useLocalStorage, useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconCloudUpload, IconFlame, IconLink, IconMenu2, IconPlus, IconSparkles, IconTrash, IconX } from '@tabler/icons-react';
import { createLazyFileRoute } from '@tanstack/react-router';
import dayjs from 'dayjs';
import React from 'react';
import ttRobot from '../assets/tt-robot.jpg';
import { theme } from '../theme';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const Route = createLazyFileRoute('/chat')({
    component: Chat,
})

type AgentUserMessage = {
    conversationKey: Conversation['key'];
    type: 'local';
    content: string;
};

type AgentAIMessage = {
    conversationKey: Conversation['key'];
    type: 'ai';
    content?: string;
    list?: (
        | {
            type: 'text';
            content: string;
        }
        | {
            type: 'suggestion';
            content: string[];
        }
    )[];
};

type AgentMessage = AgentUserMessage | AgentAIMessage;

type BubbleMessage = {
    role: string;
};

function Chat() {
    const [content, setContent] = React.useState('');
    const [headerOpen, setHeaderOpen] = React.useState(false);
    const [conversations, setConversations] = useLocalStorage<Conversation[]>({
        key: 'conversations',
        defaultValue: [],
    });
    const [messageHistories, setMessageHistories] = useLocalStorage<Record<Conversation['key'], MessageInfo<AgentMessage>[]>>({
        key: 'message-histories',
        defaultValue: {},
    });
    const [activeKey, setActiveKey] = React.useState<Conversation['key'] | undefined>(undefined);
    const [attachedFiles, setAttachedFiles] = React.useState<AttachmentsProps['items']>([]);
    const [showConversations, setShowConversations] = React.useState(true);
    const isMobileOrTablet = useMediaQuery('(max-width: 992px)');

    const senderRef = React.useRef<HTMLDivElement>(null);

    // Agent for request
    const [agent] = useXAgent<AgentMessage>({
        request: async ({ message }, { onSuccess, onError }) => {
            await sleep(1000);
            const { conversationKey, content } = message || {};
            if (!conversationKey || !content) return;

            const aiResponse: AgentAIMessage = {
                conversationKey,
                type: 'ai',
                content: `ฉันยังไม่มีความรู้เกี่ยวกับคำถาม "${content}" ค่ะ ฉันจะศึกษาข้อมูลเพิ่มเติมเพื่อตอบคำถามนี้ให้คุณค่ะ`,
                list: [
                    {
                        type: 'text',
                        content: "Do you want?",
                    },
                    {
                        type: 'suggestion',
                        content: [`Look at: ${content}`, `Search: ${content}`, `Try: ${content}`],
                    },
                ],
            }

            const userRequest: AgentUserMessage = {
                conversationKey,
                type: 'local',
                content: message?.content ?? '',
            }
            onSuccess(aiResponse);

            if (conversationKey) {
                setMessageHistories(prev => {
                    const messages = prev[conversationKey] ?? [];

                    return {
                        ...prev,
                        [conversationKey]: [
                            ...messages,
                            {
                                id: crypto.randomUUID(),
                                message: userRequest,
                                status: 'local' as const,
                            },
                            {
                                id: crypto.randomUUID(),
                                message: aiResponse,
                                status: 'success' as const,
                            }
                        ]
                    };
                });
            }
        },
    });

    // Chat messages
    const { onRequest, parsedMessages, setMessages } = useXChat<AgentMessage, BubbleMessage>({
        agent,

        // Convert AgentMessage to BubbleMessage
        parser: (agentMessages) => {
            const list = agentMessages.content ? [agentMessages] : (agentMessages as AgentAIMessage).list;

            return (list || []).map((msg) => ({
                role: msg.type,
                content: msg.content,
            }));
        },
    });

    const items: BubbleListProps['items'] = parsedMessages.map(({ id, message, status }) => ({
        key: id,
        loading: status === 'loading',
        typing: status !== 'local',
        ...message,
    }));

    const onSubmit = (conversationKey: Conversation['key'], nextContent: string) => {
        if (!nextContent) return;
        onRequest({
            conversationKey: conversationKey,
            type: 'local',
            content: nextContent,
        });
        setContent('');
    };

    const onPromptsItemClick: (
        conversationKey: Conversation['key'],
        info: { data: PromptProps; }
    ) => void = (conversationKey, info) => {
        // onRequest(info.data.description as string);
        onSubmit(conversationKey, info.data.description as string);
    };

    const onAddConversation = () => {
        const timestamp = dayjs().utc().unix();
        const newKey = crypto.randomUUID();
        const currentDate = dayjs(timestamp).format('DD/MM/BBBB');

        setConversations(prev => [
            ...prev,
            {
                key: newKey,
                label: `การสนทนา ${newKey}`,
                timestamp,
                group: currentDate,
            },
        ]);
        setActiveKey(newKey);
        setMessages([]);
    };

    const onDeleteConversation = React.useCallback((key: string) => {
        // ทำทุกอย่างใน callback เดียวกัน
        setConversations(prev => {
            // 1. สร้าง conversations array ใหม่ที่ไม่มี conversation ที่จะลบ
            const newConversations = prev.filter(conv => conv.key !== key);
            
            // 2. หา conversation ถัดไปจาก array ใหม่
            const newActiveKey = newConversations[0]?.key;
            
            // 3. ถ้าลบ conversation ที่กำลังดูอยู่ ให้เปลี่ยน activeKey
            if (key === activeKey) {
                // ใช้ setTimeout เพื่อให้แน่ใจว่า conversations ถูกอัพเดทก่อน
                setTimeout(() => {
                    setActiveKey(newActiveKey);
                    // อัพเดท messages ให้เป็นของ conversation ใหม่
                    setMessages(newActiveKey ? messageHistories[newActiveKey] || [] : []);
                }, 0);
            }
            
            // 4. ลบ messages history
            setMessageHistories(prev => {
                const newMessageHistories = { ...prev };
                delete newMessageHistories[key];
                return newMessageHistories;
            });
            
            return newConversations;
        });
    }, [activeKey, messageHistories]);

    const onConversationClick: ConversationsProps['onActiveChange'] = (key) => {
        setActiveKey(key);
        setMessages(messageHistories[key] || []);
    };

    const handleFileChange: AttachmentsProps['onChange'] = (info) => setAttachedFiles(info.fileList);

    const conversationOperationMenu: ConversationsProps['menu'] = (conversation) => ({
        items: [
            {
                label: 'ลบ',
                key: 'delete',
                icon: <IconTrash />,
                danger: true,
            },
        ],
        onClick: (menuInfo) => {
            switch (menuInfo.key) {
                case 'delete':
                    onDeleteConversation(conversation.key);
                    break;
                default:
                    notifications.show({
                        title: 'เกิดข้อผิดพลาด',
                        message: 'เกิดข้อผิดพลาดในการดำเนินการ',
                        color: 'red',
                    });
                    break;
            }
        },
    });

    // const groupable: ConversationsProps['groupable'] = {
    //     sort: (a, b) => dayjs(a.).isBefore(dayjs(b.timestamp)) ? -1 : 1,
    // }

    const placeholderNode = (
        <Stack gap="md">
            <Welcome
                variant='borderless'
                icon={<Avatar src={ttRobot} alt="น้องทีที" size="lg" />}
                title={(() => {
                    const hour = new Date().getHours();
                    if (hour >= 5 && hour < 12) {
                        return "สวัสดีตอนเช้าค่ะ ✨ วันนี้อากาศดีนะคะ";
                    }
                    if (hour >= 12 && hour < 17) {
                        return "สวัสดีตอนกลางวันค่ะ 🌞 ทานข้าวแล้วหรือยังคะ?";
                    }
                    if (hour >= 17 && hour < 22) {
                        return "สวัสดีตอนเย็นค่ะ 🌅 วันนี้เป็นอย่างไรบ้างคะ?";
                    }

                    return "สวัสดีตอนดึกค่ะ 🌙 อย่าลืมพักผ่อนด้วยนะคะ";
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
                                description: "ทำไมถึงไม่มีใครหล่อเท่เท่าฉัน?",
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
                onItemClick={(info) => onPromptsItemClick(activeKey ?? '', info)}
            />
        </Stack>
    )

    React.useEffect(() => {
        setMessages(activeKey ? messageHistories[activeKey] || [] : []);
    }, [activeKey, messageHistories]);

    return (
        <Container p="md">
            <Card shadow="sm" radius="md" withBorder>
                <Card.Section
                    withBorder
                    inheritPadding
                    py="xs"
                >
                    <Group justify="space-between" align="center">
                        <Group gap="sm">
                            <ActionIcon
                                onClick={() => setShowConversations(!showConversations)}
                                variant="light"
                                size="lg"
                                color="gray"
                                title={showConversations ? "ซ่อนรายการแชท" : "แสดงรายการแชท"}
                            >
                                {showConversations ? <IconX size={20} /> : <IconMenu2 size={20} />}
                            </ActionIcon>
                            <Group gap="xs">
                                <Avatar src={ttRobot} size="sm" />
                                <Text size="sm" fw={500}>น้องทีที AI Chat</Text>
                            </Group>
                        </Group>
                    </Group>
                </Card.Section>

                <Card.Section py="md">
                    <XProvider direction="ltr">
                        <Group align='flex-start' h={600} pos="relative">
                            {/* Conversations panel with slide animation */}
                            <Stack
                                style={{
                                    height: '100%',
                                    width: showConversations ? 220 : 0,
                                    overflow: 'hidden',
                                    transition: 'all 0.3s ease',
                                    opacity: showConversations ? 1 : 0,
                                    position: isMobileOrTablet ? 'absolute' : 'relative',
                                    left: 0,
                                    top: 0,
                                    bottom: 0,
                                    background: theme.white,
                                    zIndex: 1,
                                    borderRight: showConversations ? '1px solid var(--mantine-color-gray-2)' : 'none',
                                }}
                            >
                                {showConversations && (
                                    <ConversationsPanel
                                        conversations={conversations}
                                        activeKey={activeKey}
                                        onConversationClick={(key) => {
                                            onConversationClick(key);
                                            if (isMobileOrTablet) {
                                                setShowConversations(false);
                                            }
                                        }}
                                        conversationOperationMenu={conversationOperationMenu}
                                        onAddConversation={onAddConversation}
                                    />

                                )}
                            </Stack>

                            {/* Chat area */}
                            <Stack
                                gap="md"
                                justify='flex-start'
                                h="100%"
                                w="100%"
                                align='stretch'
                                style={{
                                    flex: 1,
                                    marginLeft: isMobileOrTablet ? (showConversations ? '220px' : 0) : showConversations ? '1rem' : 0,
                                    transition: 'margin 0.3s ease',
                                }}
                            >
                                {activeKey ? (
                                    <Stack gap="md" justify='flex-start' h="100%" w="100%" align='stretch' px="md" style={{ flex: 1 }}>
                                        <Bubble.List
                                            autoScroll
                                            roles={{
                                                ai: {
                                                    placement: 'start',
                                                    avatar: <Avatar src={ttRobot} alt="น้องทีที" size="md" />,
                                                    header: 'น้องทีที',
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
                                            items={items.length > 0 ? items.map((item, index) => ({
                                                ...item,
                                                typing: item.role === 'ai' && index === items.length - 1 ? { step: 5, interval: 20 } : false,
                                            })) : [{ content: placeholderNode, variant: 'borderless' }]}
                                        />
                                        <Sender
                                            disabled={!activeKey}
                                            header={
                                                <Sender.Header
                                                    title="ไฟล์แนบ"
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
                                                        onChange={handleFileChange}
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
                                            onSubmit={(content) => onSubmit(activeKey, content)}
                                            allowSpeech
                                        />
                                    </Stack>
                                ) : (
                                    null
                                )}
                            </Stack>
                        </Group>
                    </XProvider>
                </Card.Section>
            </Card>
        </Container>
    );
}

// Add interface for ConversationsPanel props
interface ConversationsPanelProps {
    conversations: Conversation[];
    activeKey: Conversation['key'] | undefined;
    onConversationClick: ConversationsProps['onActiveChange'];
    conversationOperationMenu: ConversationsProps['menu'];
    onAddConversation: () => void;
}

// Update the component with types
function ConversationsPanel({
    conversations,
    activeKey,
    onConversationClick,
    conversationOperationMenu,
    onAddConversation
}: ConversationsPanelProps) {
    return (
        <Stack w={220} gap="md" justify='flex-start' align='stretch' h="100%">
            <Conversations
                items={conversations}
                activeKey={activeKey}
                onActiveChange={onConversationClick}
                menu={conversationOperationMenu}
                style={{
                    height: "100%",
                    overflow: 'scroll',
                    fontFamily: theme.fontFamily,
                }}
                styles={{
                    item: {
                        flex: 'none',
                        fontFamily: theme.fontFamily,
                    },
                }}
            />
            <Button
                onClick={onAddConversation}
                variant='transparent'
                leftSection={<IconPlus />}
            >
                สร้างแชทใหม่
            </Button>
        </Stack>
    );
}