import { Flex } from "@chakra-ui/react";
import { formatNum } from "@/lib/helper";
import WtCard from "@/components/dosingWt/wtCard";
import MetricCard from "@/components/dosingWt/metricCard";

export default function DosingWt({ pt }) {
  const { age, gender, height, scr, weight } = pt;
  const heightCm = height * 2.54;
  const heightMeters = heightCm / 100;
  const genderFactor = gender === "male" ? 50 : 45.5;
  const idealWt = formatNum(genderFactor + 2.3 * (height - 60), 2);
  const adjustedWt = formatNum(idealWt + 0.4 * (weight - idealWt), 2);
  const percentIdeal = Math.round(((weight - idealWt) / idealWt) * 100) + 100;
  const bmi = formatNum(weight / Math.pow(heightMeters, 2), 2);
  const bsa = formatNum(Math.sqrt((heightCm * weight) / 3600, 2), 2);

  const genderFactorCrcl = pt.gender === "male" ? 1 : 0.85;
  const crcl = (wt) =>
    formatNum(((140 - age) * wt * genderFactorCrcl) / (72 * scr), 2);

  const renalWt =
    weight < idealWt
      ? { value: weight, type: "actual", crcl: crcl(weight) }
      : percentIdeal > 119
      ? { value: adjustedWt, type: "adjusted", crcl: crcl(adjustedWt) }
      : { value: idealWt, type: "ideal", crcl: crcl(idealWt) };

  const weights = [
    {
      type: "actual",
      value: weight,
      crcl: crcl(weight),
    },
    {
      type: "ideal",
      value: idealWt,
      crcl: crcl(idealWt),
    },
    {
      type: "adjusted",
      value: adjustedWt,
      crcl: crcl(adjustedWt),
    },
  ];

  const metrics = [
    {
      title: "ibw",
      value: percentIdeal,
      unit: "%",
      color:
        percentIdeal > 119
          ? "redErrorToken"
          : percentIdeal > 114
          ? "yellowWarningToken"
          : percentIdeal < 100
          ? "redErrorToken"
          : "inverseBgToken",
    },
    {
      title: "bmi",
      value: bmi,
      unit: (
        <span>
          &nbsp;m<sup>2</sup>
        </span>
      ),
      color:
        bmi > 40
          ? "redErrorToken"
          : bmi > 35
          ? "yellowWarningToken"
          : bmi < 18.6
          ? "redErrorToken"
          : "inverseBgToken",
    },
    {
      title: "bsa",
      value: bsa,
      unit: (
        <span>
          &nbsp;<sup>kg</sup>&frasl;<sub>m</sub>
          <sup>2</sup>
        </span>
      ),
    },
  ];
  return (
    <Flex direction="column" gap="0.8em">
      <WtCard pt={pt} renalWt={renalWt} weights={weights} />

      <Flex gap="1.3em" justifyContent="center">
        {metrics.map((m) => (
          <MetricCard
            key={m.title}
            color={m.color}
            unit={m.unit}
            title={m.title}
            value={m.value}
            renalWt={renalWt}
          />
        ))}
      </Flex>
    </Flex>
  );
}
