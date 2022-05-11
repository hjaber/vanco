import { useEffect } from "react";
import { Flex } from "@chakra-ui/react";
import { formatNum } from "@/lib/helper";
import WtCard from "@/components/dosingWt/wtCard";
import MetricCard from "@/components/dosingWt/metricCard";

export default function DosingWt({ pt, setPt }) {
  const { gender, height, weight } = pt;
  const heightCm = height * 2.54;
  const heightMeters = heightCm / 100;
  const genderFactor = gender === "male" ? 50 : 45.5;
  const idealWt = formatNum(genderFactor + 2.3 * (height - 60), 2);
  const adjustedWt = formatNum(idealWt + 0.4 * (weight - idealWt), 2);
  const percentIdeal = Math.round(((weight - idealWt) / idealWt) * 100) + 100;
  const bmi = formatNum(weight / Math.pow(heightMeters, 2), 2);
  const bsa = formatNum(Math.sqrt((heightCm * weight) / 3600, 2), 2);
  const renalWt =
    weight < idealWt
      ? { renalWt: weight, renalWtType: "actual" }
      : percentIdeal > 119
      ? { renalWt: adjustedWt, renalWtType: "adjusted" }
      : { renalWt: idealWt, renalWtType: "ideal" };

  useEffect(() => {
    setPt({ ...pt, idealWt: idealWt, adjustedWt: adjustedWt, ...renalWt });
    // eslint-disable-next-line
  }, [percentIdeal]);

  const weights = [
    {
      title: "actual",
      value: weight,
    },
    {
      title: "ideal",
      value: idealWt,
    },
    {
      title: "adjusted",
      value: adjustedWt,
    },
  ];

  const metrics = [
    {
      title: "ibw",
      value: percentIdeal,
      unit: "%",
      color:
        percentIdeal > 119
          ? "red.600"
          : percentIdeal > 114
          ? "yellow.500"
          : percentIdeal < 100
          ? "red.600"
          : "gray",
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
          ? "red.600"
          : bmi > 35
          ? "yellow.500"
          : bmi < 18.6
          ? "red.600"
          : "gray",
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
      <Flex gap="0.7em" justifyContent="center">
        {weights.map((wt) => (
          <WtCard
            key={wt.title}
            pt={pt}
            setPt={setPt}
            title={wt.title}
            value={wt.value}
          />
        ))}
      </Flex>
      <Flex gap="0.7em" justifyContent="center">
        {metrics.map((m) => (
          <MetricCard
            key={m.title}
            color={m.color}
            unit={m.unit}
            title={m.title}
            value={m.value}
          />
        ))}
      </Flex>
    </Flex>
  );
}
