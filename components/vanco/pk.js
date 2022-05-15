import { Flex, Text } from "@chakra-ui/react";
import { formatNum } from "@/lib/helper";

export default function Pk({ age, crcl, weight }) {
  const vancoCl = formatNum(0.06 * (0.705 * crcl + 4), 4);
  const vd = formatNum(0.29 * age + 0.33 * weight + 11, 4);
  const ke = formatNum(vancoCl / vd, 4);
  const halfLife = formatNum(0.693 / ke, 4);

  return (
    <Flex gap="1em" fontSize="0.8em" justifyContent="center">
      <Flex direction="column" gap="0.5em" alignItems="center">
        <Text color="grayTextToken">vd</Text>
        <Text>
          {formatNum(vd, 2)} L ({formatNum(vd / weight, 2)}{" "}
          <span fontSize="0.6em">
            <sup>L</sup>&frasl;
            <sub>kg</sub>
          </span>
          )
        </Text>
      </Flex>
      <Flex direction="column" gap="0.5em" alignItems="center">
        <Text color="grayTextToken">ke</Text>
        <Text>
          {formatNum(ke, 3)}
          <span fontSize="0.6em">
            &nbsp;hr<sup>-1</sup>
          </span>
        </Text>
      </Flex>
      <Flex direction="column" gap="0.5em" alignItems="center">
        <Text color="grayTextToken">half life</Text>
        <Text>{formatNum(halfLife, 2)} hours</Text>
      </Flex>
    </Flex>
  );
}
