import { Button, Group, RenderTreeNodePayload } from "@mantine/core";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons-react";

export function Leaf({ node, elementProps }: RenderTreeNodePayload) {
    const { nodeProps, label, value } = node;
    const id = value;

    return (
        <Group gap={5} {...elementProps}>
            <div
                style={{
                    display: "flex",
                    flexDirection: "column",
                    border: "1.5px solid #000",
                    margin: "10px",
                    padding: "20px",
                    borderRadius: "10px",
                    width: "fit-content",
                    textAlign: "left",
                }}
            >
                <span style={{ color: "#888", fontSize: "1rem" }}>
                    {nodeProps?.["typeName"]}
                </span>
                <span style={{ fontSize: "1rem", fontWeight: "bold" }}>
                    {label}
                </span>
                <span style={{ color: "#888", fontSize: "1rem" }}>
                    {nodeProps?.["orgCode"]}
                </span>
            </div>
            <Button
                size="xs"
                color="blue"
                variant="light"
                radius="xl"
                onClick={() => {
                    if (nodeProps?.['handleCreate']) {
                        nodeProps?.['handleCreate'](id);
                    }
                }}
            >
                <IconPlus size={16} />
            </Button>
            <Button
                size="xs"
                color="green"
                variant="light"
                radius="xl"
                onClick={() => {
                    if (nodeProps?.['handleUpdate']) {
                        nodeProps?.['handleUpdate'](id);
                    }
                }}
            >
                <IconPencil size={16} />
            </Button>
            <Button
                size="xs"
                color="red"
                variant="light"
                radius="xl"
                onClick={() => {
                    if (nodeProps?.['handleDelete']) {
                        nodeProps?.['handleDelete'](id);
                    }
                }}
            >
                <IconTrash size={16} />
            </Button>
        </Group>
    );
}
