import { useState } from "react";
import {
  Flex,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
} from "@chakra-ui/react";
import { doses } from "@/components/vanco/doses";
import Note from "@/components/vanco/note";

export default function Levels({ ke, halfLife, vancoCl, vd }) {
  const [selectedDose, setSelectedDose] = useState(null);

  const labels = ["dose", "freq", "peak", "trough", "auc"];

  const handleClick = (d, i) => {
    setSelectedDose({
      dose: d.dose,
      freq: d.freq,
      infusionTime: d.infusionTime,
      doseIndex: i,
    });
  };

  const allDoses = doses.map((d) => {
    const { dose, infusionTime, freq } = d;
    const dailyDose = (dose * 24) / freq;
    const auc = Math.round(dailyDose / vancoCl);
    const peak = Math.round(
      (dose * (1 - Math.pow(Math.E, -ke * infusionTime))) /
        (ke * vd * infusionTime * (1 - Math.pow(Math.E, -ke * freq)))
    );
    const trough = Math.round(
      peak * Math.pow(Math.E, -ke * (freq - infusionTime))
    );
    return {
      dose: dose,
      freq: freq,
      peak: peak,
      trough: trough,
      auc: auc,
      infusionTime: infusionTime,
    };
  });

  const goalDoses = allDoses.filter(
    (d) =>
      d.auc > 300 &&
      d.auc < 700 &&
      d.freq > halfLife / 2 &&
      d.trough < 22 &&
      d.trough > 5
  );

  return (
    <Flex direction="column" gap="1em" alignItems="center">
      <TableContainer>
        <Table size="sm" variant="unstyled">
          <Thead>
            <Tr>
              {labels.map((l) => (
                <Th
                  key={l}
                  color="grayTextToken"
                  textTransform="lowercase"
                  fontSize="0.7rem"
                  fontWeight="normal"
                >
                  {l}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {goalDoses.map((d, i) => (
              <Tr
                key={i}
                onClick={() => handleClick(d, i)}
                //borderRadius="lg"
                bgColor={
                  selectedDose?.doseIndex === i ? "grayBgToken" : "bgToken"
                }
                //boxShadow={selectedDose?.doseIndex === i && "md"}
                _hover={{
                  transition: "0.1s ease-in",
                  cursor: "pointer",
                  bgColor: "grayHoverToken",
                }}
                transition="0.3s ease-in" /* hover off transition */
              >
                <Td borderLeftRadius="lg" fontSize="0.8rem">
                  {new Intl.NumberFormat("en-IN").format(d.dose)} mg
                </Td>
                <Td fontSize="0.8rem">Q{d.freq}</Td>
                <Td fontSize="0.8rem">{d.peak}</Td>
                <Td fontSize="0.8rem">{d.trough}</Td>
                <Td
                  color={d.auc > 390 && d.auc < 610 && "green.500"}
                  borderRightRadius="lg"
                  fontSize="0.8rem"
                >
                  {d.auc}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </TableContainer>
      {selectedDose && (
        <Note
          dose={selectedDose.dose}
          freq={selectedDose.freq}
          infusionTime={selectedDose.infusionTime}
          //added key so default lvl timing changes from 3/4 & 4/5 depending on freq selected
          key={selectedDose.dose + selectedDose.freq}
        />
      )}
    </Flex>
  );
}

// {goalDoses.map((d, i) => (
//   <Flex
//     key={i}
//     gap="1.5em"
//     alignItems="center"
//     onClick={() => handleClick(d, i)}
//     borderRadius="lg"
//     bgColor={selectedDose?.doseIndex === i ? "grayBgToken" : "bgToken"}
//     boxShadow={selectedDose?.doseIndex === i && "md"}
//     _hover={{
//       transition: "0.1s ease-in",
//       cursor: "pointer",
//       bgColor: "grayHoverToken",
//     }}
//     transition="0.5s ease-in" /* hover off transition */
//     px={2}
//   >
//     <Text>{d.dose}mg</Text>
//     <Text>Q{d.freq}</Text>
//     <Text>{d.peak}</Text>
//     <Text>{d.cMin}</Text>
//     <Text color={d.auc > 390 && d.auc < 610 && "green.500"}>{d.auc}</Text>
//   </Flex>
// ))}
