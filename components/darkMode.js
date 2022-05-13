import { Text, useColorMode } from "@chakra-ui/react";

export default function DarkMode() {
  const { toggleColorMode } = useColorMode();
  return (
    <Text
      onClick={toggleColorMode}
      //variant="outline"
      //size="xs"
      //boxShadow="md"
      fontSize="2xl"
      cursor="pointer"
    >
      &#9788;
    </Text>
  );
}
