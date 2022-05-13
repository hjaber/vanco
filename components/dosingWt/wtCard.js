import { Flex, Text } from "@chakra-ui/react";
import { formatNum } from "@/lib/helper";

export default function WtCard({ pt, setPt, title, value }) {
  const genderFactor = pt.gender === "male" ? 1 : 0.85;
  const crcl = formatNum(
    ((140 - pt.age) * value * genderFactor) / (72 * pt.scr),
    2
  );

  const displayCrcl = Math.round(crcl);

  return (
    <Flex
      onClick={() =>
        setPt({ ...pt, renalWt: value, renalWtType: title, crcl: crcl })
      }
      direction="column"
      gap="0.2em"
      alignItems="center"
      borderRadius="lg"
      borderWidth="3px"
      borderColor="transparent"
      bgColor={pt.renalWt === value ? "grayBgToken" : "bgToken"}
      _hover={{
        transition: "0.1s ease-in",
        cursor: "pointer",
        borderWidth: "3px",
        borderColor: "grayHoverToken",
      }}
      transition="0.5s ease-in" /* hover off transition */
      p={1} /* give borderRadius background extra space */
    >
      <Text color="grayTextToken" fontSize="0.8em">
        {title}
      </Text>
      <Text>{value} kg</Text>

      {/* scr > 0.067 comes from the IDMS to conventional SCr conversion, min scr value = 0.067 */}
      {pt.scr > 0.067 && (
        <Text
          color={
            displayCrcl > 50
              ? "inverseBgToken"
              : displayCrcl < 30
              ? "redErrorToken"
              : "yellowWarningToken"
          }
        >
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
