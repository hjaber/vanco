import { useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { formatNum } from "@/lib/helper";

export default function Pk({ pt, setPt }) {
  const { age, crcl, weight } = pt;
  const vancoCl = formatNum(0.06 * (0.705 * crcl + 4), 4);
  const vd = formatNum(0.29 * age + 0.33 * weight + 11, 4);
  const ke = formatNum(vancoCl / vd, 4);
  const halfLife = formatNum(0.693 / ke);

  useEffect(() => {
    setPt({
      ...pt,
      vancoCl: vancoCl,
      vd: vd,
      ke: ke,
      halfLife: halfLife,
    });
    // eslint-disable-next-line
  }, [vancoCl]);

  return (
    <Flex
      gap="1em"
      textColor="grayTextToken"
      fontSize="0.8em"
      justifyContent="center"
    >
      <Flex direction="column" gap="0.5em" alignItems="center">
        <Text>vd</Text>
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
        <Text>ke</Text>
        <Text>
          {formatNum(ke, 3)}
          <span fontSize="0.6em">
            &nbsp;hr<sup>-1</sup>
          </span>
        </Text>
      </Flex>
      <Flex direction="column" gap="0.5em" alignItems="center">
        <Text>half life</Text>
        <Text>{formatNum(halfLife, 2)} hours</Text>
      </Flex>
    </Flex>
  );
}
