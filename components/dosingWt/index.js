import { useState } from "react";
import { Flex, SimpleGrid } from "@chakra-ui/react";
import { formatNum } from "@/lib/helper";
import MetricCard from "@/components/dosingWt/metricCard";
import PkCard from "@/components/vanco/pkCard";
import WtCard from "@/components/dosingWt/wtCard";
import Vancomycin from "@/components/vanco/index";

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
  const [crclWt, setCrclWt] = useState(renalWt);

  const vancoCl = formatNum(0.06 * (0.705 * crclWt.crcl + 4), 4);
  const vd = formatNum(0.29 * age + 0.33 * weight + 11, 4);
  const ke = formatNum(vancoCl / vd, 4);
  const halfLife = formatNum(0.693 / ke);

  const pks = [
    {
      type: "vd",
      value: vd,
      unit: (
        <span fontSize="0.6rem">
          L ({formatNum(vd / weight, 2)} <sup>L</sup>&frasl;<sub>kg</sub>)
        </span>
      ),
      display: Math.round(vd),
    },
    {
      type: "ke",
      value: ke,
      unit: (
        <span fontSize="0.6rem">
          &nbsp;hr<sup>-1</sup>
        </span>
      ),
      display: formatNum(ke, 3),
    },
    {
      type: "half life",
      value: halfLife,
      unit: "hours",
      display: formatNum(halfLife, 2),
    },
  ];

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
    <Flex direction="column" gap="1rem">
      <SimpleGrid columns={3} spacing="0.8rem" m="auto">
        {weights.map((wt) => (
          <WtCard
            key={wt.type}
            crcl={wt.crcl}
            crclWt={crclWt}
            scr={pt.scr}
            setCrclWt={setCrclWt}
            type={wt.type}
            value={wt.value}
          />
        ))}

        {metrics.map((m) => (
          <MetricCard
            key={m.title}
            color={m.color}
            unit={m.unit}
            title={m.title}
            value={m.value}
          />
        ))}
        {/* insert vancomycin components here */}
        {pt.scr > 0.067 &&
          pt.vancomycin &&
          pks.map((pk) => (
            <PkCard
              key={pk.type}
              display={pk.display}
              type={pk.type}
              unit={pk.unit}
            />
          ))}
      </SimpleGrid>
      {pt.scr > 0.067 && pt.vancomycin && (
        <Vancomycin
          ke={ke}
          halfLife={halfLife}
          weight={pt.weight}
          vancoCl={vancoCl}
          vd={vd}
        />
      )}
    </Flex>
  );
}
