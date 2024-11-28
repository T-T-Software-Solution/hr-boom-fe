import { Pill } from '@mantine/core';
import type { FileDisplayProps } from './FileDisplay.types';

export const FileDisplay: FileDisplayProps = ({ value }) => {
  if (value === null) {
    return null;
  }

  if (typeof value === 'string') {
    return <Pill>{value}</Pill>;
  }

  if (Array.isArray(value)) {
    return (
      <Pill.Group>
        {value.map((file, index) => (
          <Pill key={`${index}-${file.name}`}>{file.name}</Pill>
        ))}
      </Pill.Group>
    );
  }

  return <Pill>{value.name}</Pill>;
};
