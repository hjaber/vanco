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
import LoadingDose from "@/components/vanco/loadingDose";
import { formatDose, formatLd } from "@/lib/helper";

export default function Levels({ ke, halfLife, vancoCl, vd, weight }) {
  const [selectedDose, setSelectedDose] = useState(null);
  const [ld, setLd] = useState({ dose: 20, str: formatLd(20 * weight) });
  const loadingDoses = [
    { dose: 15, str: formatLd(15 * weight), value: formatDose(15 * weight) },
    { dose: 20, str: formatLd(20 * weight), value: formatDose(20 * weight) },
    { dose: 25, str: formatLd(25 * weight), value: formatDose(25 * weight) },
  ];
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
      d.auc > 330 &&
      d.auc < 670 &&
      d.freq > halfLife / 2 &&
      d.freq < halfLife * 2.25 &&
      d.trough < 23 &&
      d.trough > 5
  );

  return (
    <Flex direction="column" gap="1em" alignItems="center">
      <Flex gap="1rem">
        {loadingDoses.map((l) => (
          <LoadingDose
            key={l.dose}
            dose={l.dose}
            ld={ld}
            str={l.str}
            setLd={setLd}
            value={l.value}
          />
        ))}
      </Flex>

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
                  {formatDose(d.dose)}
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
          loadingDose={ld.str}
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
