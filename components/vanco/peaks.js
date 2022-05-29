import { Flex, Text } from "@chakra-ui/react";

export default function Peaks({ peak, selectedDose, setSelectedDose }) {
  const handleClick = () => {
    setSelectedDose({
      ...selectedDose,
      peak: peak,
    });
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
      bgColor={selectedDose.peak === peak ? "grayBgToken" : "bgToken"}
      boxShadow={selectedDose.peak === peak && "md"}
      _hover={{
        transition: "0.1s ease-in",
        cursor: "pointer",
        borderWidth: "3px",
        borderColor: "grayHoverToken",
      }}
      transition="0.3s ease-in" /* hover off transition */
      p={1} /* give borderRadius background extra space */
      my="auto"
    >
      <Text fontSize="0.8rem">
        {peak === 3 ? (
          <span>
            {peak}
            <sup>rd</sup>
          </span>
        ) : (
          <span>
            {peak}
            <sup>th</sup>
          </span>
        )}
        <span>
          /{peak + 1}
          <sup>th</sup>
        </span>
      </Text>
    </Flex>
  );
}
