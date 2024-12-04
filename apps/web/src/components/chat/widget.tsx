import { ActionIcon, Affix, Popover, Tooltip, Transition } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { IconMessageFilled } from '@tabler/icons-react';
import { Chat } from './chat';

export const ChatWidget = () => {
    const [opened, { toggle }] = useDisclosure(false);
    const isMobileOrTablet = useMediaQuery('(max-width: 768px)');

    return (
        <Popover
            width={isMobileOrTablet ? '100%' : 400}
            position="bottom"
            clickOutsideEvents={['mouseup', 'touchend']}
            shadow='none'
            offset={0}
        >
            <Popover.Target>
                <Affix position={{ bottom: 20, right: 20 }}>
                    <Transition transition="slide-up" mounted>
                        {(transitionStyles) => (
                            <Tooltip
                                label={`${opened ? 'ปิด' : 'เริ่มต้น'}การสนทนา`}
                                withArrow
                                arrowPosition="side"
                                transitionProps={{
                                    transition: 'pop',
                                    duration: 150,
                                    timingFunction: 'linear'
                                }}
                            >
                                <ActionIcon
                                    aria-label={`${opened ? 'ปิด' : 'เริ่มต้น'}การสนทนา`}
                                    onClick={toggle}
                                    style={transitionStyles}
                                    size="xl"
                                    variant="gradient"
                                    gradient={{ from: 'green', to: 'teal', deg: 244 }}
                                    autoContrast
                                    radius="xl"
                                >
                                    <IconMessageFilled />
                                </ActionIcon>
                            </Tooltip>
                        )}
                    </Transition>
                </Affix>
            </Popover.Target>
            <Popover.Dropdown style={{
                background: 'transparent',
                boxShadow: 'none',
                border: 'none',
            }}>
                <Chat height="60vh" width="100%" />
            </Popover.Dropdown>
        </Popover>
    )
}