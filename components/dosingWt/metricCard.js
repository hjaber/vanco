import { Flex, Text } from "@chakra-ui/react";

export default function MetricCard({ color, title, unit, value }) {
  return (
    <Flex direction="column" gap="0.2rem" alignItems="center">
      <Text color="grayTextToken" fontSize="0.8rem">
        {title}
      </Text>
      <Text color={color} fontSize="0.8rem">
        {value}
        {unit}
      </Text>
    </Flex>
  );
}
