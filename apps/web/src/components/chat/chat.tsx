import { Attachments, type AttachmentsProps, Bubble, type PromptProps, Prompts, Sender, Welcome, XProvider, useXAgent, useXChat } from '@ant-design/x';
import type { BubbleListProps } from '@ant-design/x/es/bubble/BubbleList';
import type { Conversation } from '@ant-design/x/es/conversations';
import type { MessageInfo } from '@ant-design/x/es/useXChat';
import { ActionIcon, Avatar, Button, Card, Group, Indicator, type MantineStyleProps, Stack, Text } from '@mantine/core';
import { useLocalStorage, useMediaQuery } from '@mantine/hooks';
import { modals } from '@mantine/modals';
import { IconCloudUpload, IconFlame, IconLink, IconRefresh } from '@tabler/icons-react';
import dayjs from 'dayjs';
import DOMPurify from 'dompurify';
import React from 'react';
import ttRobot from '../../assets/tt-robot.jpg';
import { theme } from '../../theme';

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

type AgentUserMessage = {
    conversationKey: Conversation['key'];
    type: 'local';
    content: string;
    createdAt?: Date | null;
};

type AgentAIMessage = {
    conversationKey: Conversation['key'];
    type: 'ai';
    content?: string;
    createdAt?: Date | null;
    list?: (
        | {
            conversationKey: Conversation['key'];
            type: 'text';
            content: string;
            createdAt?: Date | null;
        }
        | {
            conversationKey: Conversation['key'];
            type: 'suggestion';
            content: string[];
            createdAt?: Date | null;
        }
    )[];
};

type AgentMessage = AgentUserMessage | AgentAIMessage;

type BubbleMessage = {
    conkey: Conversation['key'];
    role: string;
    created?: Date | null;
};

const getCurrentDate = () => dayjs().utc().toDate();

interface ChatProps {
    height?: MantineStyleProps['h']
    width?: MantineStyleProps['w']
}

export const Chat: React.FC<ChatProps> = ({ height = 700, width = 400 }) => {
    const [content, setContent] = React.useState('');
    const [headerOpen, setHeaderOpen] = React.useState(false);
    const [messageHistories, setMessageHistories, clearMessageHistories] = useLocalStorage<Record<Conversation['key'], MessageInfo<AgentMessage>[]>>({
        key: 'message-histories',
        defaultValue: {},
    });
    const [activeKey, setActiveKey, clearActiveKey] = useLocalStorage<Conversation['key']>({
        key: 'conversation-key',
        defaultValue: crypto.randomUUID(),
    });
    const [attachedFiles, setAttachedFiles] = React.useState<AttachmentsProps['items']>([]);
    const isMobileOrTablet = useMediaQuery('(max-width: 992px)');

    const senderRef = React.useRef<HTMLDivElement>(null);

    // Agent for request
    const [agent] = useXAgent<AgentMessage>({
        request: async ({ message }, { onSuccess, onError }) => {
            const { conversationKey, content } = message || {};
            if (!conversationKey || !content) return;

            const userRequest: AgentUserMessage = {
                conversationKey,
                type: 'local',
                content: message?.content ?? '',
                createdAt: message?.createdAt ?? getCurrentDate(),
            }
            
            const qryStr = new URLSearchParams({
                question: content,
                tag: '',
                isNeedGpt: 'false',
            })
            const res = await fetch(`https://localhost:58115/api/v1/AskQuestion/GetListBySearch?${qryStr.toString()}`)
            const data = await res.json()
            let answer = 'ขออภัยค่ะ ตอนนี้ฉันยังไม่สามารถตอบคำถามของคุณได้ค่ะ'
            const [firstAnswer] = data
            if (firstAnswer?.answer) {
                answer = firstAnswer.answer
            }

            const aiResponse: AgentAIMessage = {
                conversationKey,
                type: 'ai',
                content: answer,
                list: [
                    {
                        conversationKey,
                        type: 'text',
                        content: "Do you want?",
                    },
                    {
                        conversationKey,
                        type: 'suggestion',
                        content: [`Look at: ${content}`, `Search: ${content}`, `Try: ${content}`],
                    },
                ],
                createdAt: getCurrentDate(),
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

            return (list || []).map((msg) => {
                if (['text', 'suggestion'].includes(msg.type)) {
                    return {
                        conkey: msg.conversationKey,
                        role: msg.type,
                        content: msg.content,
                    }
                }

                return {
                    conkey: msg.conversationKey,
                    role: msg.type,
                    content: msg.content,
                    created: msg.createdAt
                }
            });
        },
    });

    const items: BubbleListProps['items'] = parsedMessages.map(({ id, message, status }, index) => ({
        ...message,
        key: id,
        loading: status === 'loading',
        typing: message.role === 'ai' && index === parsedMessages.length - 1 ? { step: 5, interval: 20 } : false,
        footer: (
            <Text size="xs" c="gray.6">
                {dayjs(message.created).format('HH:mm')}
            </Text>
        ),
    }));

    const onSubmit = (conversationKey: Conversation['key'], nextContent: string) => {
        if (!nextContent) return;
        onRequest({
            conversationKey: conversationKey,
            type: 'local',
            content: nextContent,
            createdAt: getCurrentDate(),
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

    const onStartConversation = () => {
        setActiveKey(crypto.randomUUID());
    }

    const onClearConversation = () => {
        modals.openConfirmModal({
            title: 'คุณต้องการล้างประวัติการสนทนาใช่หรือไม่?',
            children: (
                <Text>หากล้างแล้วจะไม่สามารถกู้คืนข้อมูลได้อีก</Text>
            ),
            labels: {
                confirm: 'ยืนยัน',
                cancel: 'ยกเลิก',
            },
            onConfirm: () => {
                clearActiveKey();
                clearMessageHistories();
                onStartConversation();
            },
            zIndex: 1000,
        });
    }

    const handleFileChange: AttachmentsProps['onChange'] = (info) => setAttachedFiles(info.fileList);

    const placeholderNode = (
        <Stack gap="md" maw={600}>
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

                    return "สวัสดีตอนดึกค่ะ 🌙 อย่าลืมพักผ่อ���ด้วยนะคะ";
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
                                key: '1-0',
                                description: "แอปพลิเคชัน 'พ้นภัย' คืออะไร?",
                            },
                            {
                                key: '1-1',
                                description: "อยากบริจาคอวัยวะต้องทำอะไรบ้าง?",
                            },
                            {
                                key: '1-2',
                                description: "นโยบายของกระทรวงสาธารณสุขเกี่ยวกับการบริจาคอวัยวะคืออะไร?",
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
        <Card shadow="sm" radius="md" withBorder>
            <Card.Section
                withBorder
                inheritPadding
                py="xs"
            >
                <Group justify="space-between" align="center">
                    <Group gap="xs" justify='space-between'>
                        <Text size="sm" fw={500}>น้องทีที AI Chat</Text>
                    </Group>
                    {
                        isMobileOrTablet ? (
                            <ActionIcon autoContrast aria-label="ล้างประวัติ" variant="light" size="xs" color="red" onClick={onClearConversation}>
                                <IconRefresh />
                            </ActionIcon>
                        ) : (
                            <Button variant="light" size="xs" color="red" onClick={onClearConversation}>ล้างประวัติ</Button>
                        )
                    }
                </Group>
            </Card.Section>

            <Card.Section py="md">
                <XProvider direction="ltr">
                    <Group align='flex-start' pos="relative" h={height} w={width}>
                        <Stack gap="md" justify='flex-start' px="md" w="100%" h="100%">
                            {items.length < 1 && placeholderNode}
                            <Bubble.List
                                autoScroll
                                roles={{
                                    ai: {
                                        placement: 'start',
                                        avatar: <Avatar src={ttRobot} alt="น้องทีที" size="md" />,
                                        header: 'น้องทีที',
                                        variant: 'outlined',
                                        style: {
                                            maxWidth: 600,
                                            paddingRight: 50,
                                        },
                                        styles: {
                                            footer: {
                                                marginTop: 2,
                                                alignSelf: 'end',
                                                marginRight: 10,
                                            }
                                        },
                                        messageRender: (message) => {
                                            return (<Text>
                                                <div
                                                    style={{
                                                        whiteSpace: 'pre-wrap',
                                                    }}
                                                    // biome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
                                                    dangerouslySetInnerHTML={{
                                                        __html: DOMPurify.sanitize(message)
                                                    }}
                                                />
                                            </Text>)
                                        }
                                    },
                                    local: {
                                        placement: 'end',
                                        avatar: <Avatar color="primary" size="md">คุณ</Avatar>,
                                        variant: 'outlined',
                                        typing: false,
                                        style: {
                                            alignSelf: 'flex-end',
                                            paddingLeft: 50,
                                        },
                                        styles: {
                                            content: {
                                                color: theme.colors?.primary?.[6],
                                                borderColor: theme.colors?.primary?.[1],
                                            },
                                            footer: {
                                                marginTop: 2,
                                                marginLeft: 10,
                                            }
                                        }
                                    },
                                }}
                                style={{ flex: 1, padding: 10 }}
                                items={items}
                            />
                            <Sender
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
                                disabled={!activeKey || agent.isRequesting()}
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
                    </Group>
                </XProvider>
            </Card.Section>
        </Card>
    );
}