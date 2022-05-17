import { Flex, Text } from "@chakra-ui/react";

export default function PkCard({ display, type, unit }) {
  return (
    <Flex gap="1em" fontSize="0.8em" justifyContent="center">
      <Flex direction="column" gap="0.5em" alignItems="center">
        <Text color="grayTextToken">{type}</Text>
        <Text>
          {display} {unit}
        </Text>
      </Flex>
    </Flex>
  );
}
