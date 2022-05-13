import { Text } from "@chakra-ui/react";
import { formatNum } from "@/lib/helper";

export default function CrCl({ pt, weight }) {
  const { age, gender, renalWt, scr } = pt;
  const genderFactor = gender === "male" ? 1 : 0.85;
  const crcl = formatNum(
    ((140 - age) * renalWt * genderFactor) / (72 * scr),
    2
  );
  const displayCrcl = Math.round(
    ((140 - age) * weight * genderFactor) / (72 * scr)
  );

  //   useEffect(() => {
  //     setPt({ ...pt, crcl: crcl });
  //     // eslint-disable-next-line
  //   }, [age, renalWt]);

  return (
    <Text color={crcl < 30 && "yellowWarningToken"}>
      {displayCrcl}
      <span fontSize="0.6em">
        &nbsp;<sup>mL</sup>&frasl;
        <sub>min</sub>
      </span>
    </Text>
  );
}
