import { Text } from "@chakra-ui/react";

export default function CrCl({ crcl }) {
  const displayCrcl = Math.round(crcl);

  return (
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
  );
}
