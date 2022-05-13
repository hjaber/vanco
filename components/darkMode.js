import { Button, useColorMode } from "@chakra-ui/react";

export default function DarkMode() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <Button
      onClick={toggleColorMode}
      variant="outline"
      size="xs"
      boxShadow="md"
    >
      {colorMode === "light" ? "dark" : "light"}
    </Button>
  );
}
