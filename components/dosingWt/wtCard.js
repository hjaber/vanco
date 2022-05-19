import { Flex, Text } from "@chakra-ui/react";
import CrCl from "@/components/dosingWt/crCl";

export default function NewWtCard({
  crcl,
  crclWt,
  scr,
  setCrclWt,
  type,
  value,
}) {
  return (
    <Flex
      key={type}
      onClick={() =>
        setCrclWt({
          crcl: crcl,
          type: type,
          value: value,
        })
      }
      direction="column"
      gap="0.2em"
      alignItems="center"
      borderRadius="lg"
      borderWidth="3px"
      borderColor="transparent"
      bgColor={crclWt.type === type ? "grayBgToken" : "bgToken"}
      _hover={{
        transition: "0.1s ease-in",
        cursor: "pointer",
        borderWidth: "3px",
        borderColor: "grayHoverToken",
      }}
      transition="0.3s ease-in" /* hover off transition */
      p={1} /* give borderRadius background extra space */
    >
      <Text color="grayTextToken" fontSize="0.8em">
        {type}
      </Text>
      <Text fontSize="0.8em">{value} kg</Text>
      {/* scr > 0.067 comes from the IDMS to conventional SCr conversion, min scr value = 0.067 */}
      {scr > 0.067 && <CrCl crcl={crcl} />}
    </Flex>
  );
}
