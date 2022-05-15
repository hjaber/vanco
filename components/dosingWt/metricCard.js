import { Flex, Text } from "@chakra-ui/react";

export default function MetricCard({ color, title, unit, value }) {
  return (
    <Flex direction="column" gap="0.2em" alignItems="center">
      <Text color="grayTextToken" fontSize="0.8em">
        {title}
      </Text>
      <Text color={color} fontSize="0.8em">
        {value}
        {unit}
      </Text>
    </Flex>
  );
}
