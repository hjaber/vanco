import { Flex, Text } from "@chakra-ui/react";
import { formatNum } from "@/lib/helper";

export default function WtCard({ crclWt, setCrclWt, pt, type, value }) {
  //const [crclWt, setCrclWt] = useState(renalWt);
  const genderFactor = pt.gender === "male" ? 1 : 0.85;
  const crcl = formatNum(
    ((140 - pt.age) * value * genderFactor) / (72 * pt.scr),
    2
  );
  const displayCrcl = Math.round(crcl);

  return (
    <Flex
      onClick={() => setCrclWt({ value: value, type: type })}
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
      transition="0.5s ease-in" /* hover off transition */
      p={1} /* give borderRadius background extra space */
    >
      <Text color="grayTextToken" fontSize="0.8em">
        {type}
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
