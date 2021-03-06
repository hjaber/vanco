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
  Text,
} from "@chakra-ui/react";
import { doses } from "@/components/vanco/doses";
import Note from "@/components/vanco/note";
import LoadingDose from "@/components/vanco/loadingDose";
import { formatDose, formatLd } from "@/lib/helper";
import Peaks from "@/components/vanco/peaks";

export default function Levels({ age, ke, halfLife, vancoCl, vd, weight }) {
  const [selectedDose, setSelectedDose] = useState(null);
  const [ld, setLd] = useState({
    dose: 25,
    str: formatLd(25 * weight),
    value: formatDose(25 * weight),
  });
  const loadingDoses = [
    { dose: 15, str: formatLd(15 * weight), value: formatDose(15 * weight) },
    { dose: 20, str: formatLd(20 * weight), value: formatDose(20 * weight) },
    { dose: 25, str: formatLd(25 * weight), value: formatDose(25 * weight) },
  ];
  const labels = ["dose", "freq", "peak", "trough", "auc"];
  const firstPeaks = [3, 4, 5];

  const handleClick = (d, i) => {
    setSelectedDose({
      dose: d.dose,
      freq: d.freq,
      infusionTime: d.infusionTime,
      doseIndex: i,
      peak: d.freq < 13 ? 4 : 3,
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
      //auc goals
      d.auc > 330 &&
      d.auc < 670 &&
      //freq more than half of halfLife
      d.freq > halfLife / 2 &&
      //freq less 2x half life
      d.freq < halfLife * 2.25 &&
      //remove Q6 freq at ages >54
      d.freq > age / 9 &&
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
            weight={weight}
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
                bgColor={
                  selectedDose?.doseIndex === i ? "grayBgToken" : "bgToken"
                }
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
        <Flex direction="column" gap="1rem">
          <Flex direction="column" gap="0.3rem" alignItems="center">
            <Text color="grayTextToken" fontSize="0.7rem">
              peak trough
            </Text>
            <Flex gap="0.5rem">
              {firstPeaks.map((peak) => (
                <Peaks
                  key={peak}
                  peak={peak}
                  selectedDose={selectedDose}
                  setSelectedDose={setSelectedDose}
                />
              ))}
            </Flex>
          </Flex>
          <Note
            dose={selectedDose.dose}
            freq={selectedDose.freq}
            infusionTime={selectedDose.infusionTime}
            peak={selectedDose.peak}
            loadingDose={ld.str}
          />
        </Flex>
      )}
    </Flex>
  );
}
