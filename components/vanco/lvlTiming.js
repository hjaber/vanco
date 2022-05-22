import { Flex, Text } from "@chakra-ui/react";

export default function LvlTiming({
  label,
  peak,
  trough,
  peakStr,
  troughStr,
  lvl,
  setLvl,
}) {
  const handleClick = () => {
    setLvl({
      label: label,
      peak: peak,
      trough: trough,
      peakStr: peakStr,
      troughStr: troughStr,
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
      bgColor={lvl.peak === peak ? "grayBgToken" : "bgToken"}
      boxShadow={lvl.peak === peak && "md"}
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
      <Text fontSize="0.8rem">{label}</Text>
    </Flex>
  );
}
