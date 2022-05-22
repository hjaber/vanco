import { Flex, Text } from "@chakra-ui/react";

export default function LoadingDose({ dose, str, ld, setLd, value }) {
  const handleClick = () => {
    if (dose === ld.dose) {
      setLd("");
    } else {
      setLd({
        dose: dose,
        str: str,
        value: value,
      });
    }
  };
  return (
    <Flex
      onClick={handleClick}
      direction="column"
      gap="0.2rem"
      alignItems="center"
      borderRadius="lg"
      borderWidth="3px"
      borderColor="transparent"
      bgColor={ld.dose === dose ? "grayBgToken" : "bgToken"}
      boxShadow={ld.dose === dose && "md"}
      _hover={{
        transition: "0.1s ease-in",
        cursor: "pointer",
        borderWidth: "3px",
        borderColor: "grayHoverToken",
      }}
      transition="0.3s ease-in" /* hover off transition */
      p={1} /* give borderRadius background extra space */
    >
      <Text color="grayTextToken" fontSize="0.8rem">
        {dose} mg/kg
      </Text>
      <Text fontSize="0.8rem">{str}</Text>
      <Text fontSize="0.6rem" color="grayTextToken">
        ({value})
      </Text>
    </Flex>
  );
}
