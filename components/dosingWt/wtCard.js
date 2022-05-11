import { Flex, Text } from "@chakra-ui/react";

export default function WtCard({ pt, setPt, title, value }) {
  return (
    <Flex
      onClick={() => setPt({ ...pt, renalWt: value, renalWtType: title })}
      direction="column"
      gap="0.2em"
      alignItems="center"
      _hover={{
        bgColor: "gray.100",
        transition: "0.1s ease-in",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      transition="0.5s ease-in" /* hover off transition */
      p={1} /* give hover background space */
    >
      <Text color="gray" fontSize="0.8em">
        {title}
      </Text>
      <Text>{value} kg</Text>
    </Flex>
  );
}
