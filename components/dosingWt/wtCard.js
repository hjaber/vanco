import { Flex, Text } from "@chakra-ui/react";
import { formatNum } from "@/lib/helper";

export default function WtCard({ pt, setPt, title, value }) {
  const genderFactor = pt.gender === "male" ? 1 : 0.85;
  const crcl = formatNum(
    ((140 - pt.age) * value * genderFactor) / (72 * pt.scr),
    2
  );

  const displayCrcl = Math.round(
    ((140 - pt.age) * value * genderFactor) / (72 * pt.scr)
  );

  return (
    <Flex
      onClick={() =>
        setPt({ ...pt, renalWt: value, renalWtType: title, crcl: crcl })
      }
      direction="column"
      gap="0.2em"
      alignItems="center"
      borderRadius="md"
      bgColor={pt.renalWt === value ? "gray.100" : "white"}
      _hover={{
        bgColor: "gray.200",
        transition: "0.1s ease-in",
        cursor: "pointer",
      }}
      transition="0.5s ease-in" /* hover off transition */
      p={1} /* give hover background space */
    >
      <Text color="gray" fontSize="0.8em">
        {title}
      </Text>
      <Text>{value} kg</Text>

      {/* scr > 0.067 comes from the IDMS to conventional SCr conversion, min scr value = 0.067 */}
      {pt.scr > 0.067 && (
        <Text>
          {displayCrcl}
          <span fontSize="0.6em">
            &nbsp;<sup>mL</sup>&frasl;
            <sub>min</sub>
          </span>
        </Text>
      )}
    </Flex>
  );
}
