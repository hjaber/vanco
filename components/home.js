import { Flex } from "@chakra-ui/react";
import PtDemo from "@/components/ptDemo";

export default function Home() {
  return (
    <Flex direction="column" gap="1em">
      <PtDemo />
    </Flex>
  );
}
