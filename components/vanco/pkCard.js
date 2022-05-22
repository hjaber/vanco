import { Flex, Text } from "@chakra-ui/react";

export default function PkCard({ display, type, unit }) {
  return (
    <Flex gap="1rem" fontSize="0.8rem" justifyContent="center">
      <Flex direction="column" gap="0.2rem" alignItems="center">
        <Text color="grayTextToken">{type}</Text>
        <Text>
          {display} {unit}
        </Text>
      </Flex>
    </Flex>
  );
}
