import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { doses } from "@/components/vanco/doses";
import Note from "@/components/vanco/note";

export default function Levels({ ke, vancoCl, vd }) {
  const [selectedDose, setSelectedDose] = useState(null);

  //   const labels = ["dose", "freq", "peak", "trough", "auc"];

  const handleClick = (dose, freq, i) => {
    setSelectedDose({ dose: dose, freq: freq, doseIndex: i });
  };

  const allDoses = doses.map((d) => {
    const { dose, infusionTime, freq } = d;
    const dailyDose = (dose * 24) / freq;
    const auc = Math.round(dailyDose / vancoCl);
    const cPeak = Math.round(
      (dose * (1 - Math.pow(Math.E, -ke * infusionTime))) /
        (ke * vd * infusionTime * (1 - Math.pow(Math.E, -ke * freq)))
    );
    const cMin = Math.round(
      cPeak * Math.pow(Math.E, -ke * (freq - infusionTime))
    );
    return { dose: dose, freq: freq, cPeak: cPeak, cMin: cMin, auc: auc };
  });

  //   for (let i = 0; i < doses.length; i++) {
  //     const d = doses[i];
  //     const { dose, infusionTime, freq } = d;
  //     let goalDoses = [];
  //     const dailyDose = (dose * 24) / freq;
  //     const auc = Math.round(dailyDose / vancoCl);
  //     const cPeak = Math.round(
  //       (dose * (1 - Math.pow(Math.E, -ke * infusionTime))) /
  //         (ke * vd * infusionTime * (1 - Math.pow(Math.E, -ke * freq)))
  //     );
  //     const cMin = Math.round(
  //       cPeak * Math.pow(Math.E, -ke * (freq - infusionTime))
  //     );
  //     if (auc > 300 && auc < 700) {
  //       goalDoses.push({
  //         dose: dose,
  //         freq: freq,
  //         cPeak: cPeak,
  //         cMin: cMin,
  //         auc: auc,
  //       });
  //     }
  //     return goalDoses;
  //   }

  const goalDoses = allDoses.filter((a) => a.auc > 300 && a.auc < 700);

  return (
    <Flex direction="column" gap="1em" alignItems="center" fontSize="0.8em">
      <Flex gap="1em" color="grayTextToken">
        <Text>dose</Text>
        <Text>freq</Text>
        <Text>peak</Text>
        <Text>trough</Text>
        <Text>auc</Text>
      </Flex>
      {goalDoses.map((d, i) => (
        <Flex
          key={i}
          gap="1em"
          alignItems="center"
          onClick={() => handleClick(d.dose, d.freq, i)}
          borderRadius="lg"
          bgColor={selectedDose?.doseIndex === i ? "grayBgToken" : "bgToken"}
          _hover={{
            transition: "0.1s ease-in",
            cursor: "pointer",
            bgColor: "grayHoverToken",
          }}
          transition="0.5s ease-in" /* hover off transition */
          px={1}
        >
          <Text>{d.dose}mg</Text>
          <Text>Q{d.freq}</Text>
          <Text>{d.cPeak}</Text>
          <Text>{d.cMin}</Text>
          <Text color={d.auc > 390 && d.auc < 610 && "green.500"}>{d.auc}</Text>
        </Flex>
      ))}
      {selectedDose && (
        <Note dose={selectedDose.dose} freq={selectedDose.freq} />
      )}
    </Flex>
  );
}
