import { Prompts, type PromptsProps, Welcome } from "@ant-design/x";
import { Avatar, Group, Stack, Text } from "@mantine/core";
import { IconFlame } from "@tabler/icons-react";
import { useChatConfig } from "./provider";

const getWelcomeMessage = () => {
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
}


interface PlaceholderNodeProps {
    onPromptsItemClick: PromptsProps['onItemClick'];
}

export const PlaceholderNode = ({ onPromptsItemClick }: PlaceholderNodeProps) => {
    const config = useChatConfig();
    const welcomeMessage = getWelcomeMessage();

    return (
        <Stack gap="md" maw={600}>
            <Welcome
                variant='borderless'
                icon={<Avatar src={config.agentAvatarImageSrc} alt={config.agentName} size="lg">
                    {config.agentName}
                </Avatar>}
                title={welcomeMessage}
                description={`ฉันคือ ${config.agentName} ผู้ช่วยที่แสนดีของคุณ...`}
            />

            <Prompts
                title="คุณต้องการให้ฉันช่วยเหลืออะไรไหมคะ?"
                wrap
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
                    item: {
                        flex: 'none',
                        width: '270px',
                        backgroundImage: "linear-gradient(137deg, #fff5e6 0%, #ffe7e7 100%)",
                        border: 0,
                    },
                    subItem: {
                        background: 'rgba(255,255,255,0.45)',
                        border: '1px solid #FFF',
                    },
                }}
                onItemClick={onPromptsItemClick}
            />
        </Stack>
    )
};
