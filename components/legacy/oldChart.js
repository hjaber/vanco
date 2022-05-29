import { Flex, Text } from "@chakra-ui/react";
export default function OldChart({
  dose,
  freq,
  loadingDose,
  peakValue,
  peakStr,
  peakTime,
  startTime,
  troughValue,
  troughStr,
  troughTime,
}) {
  const options = {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23" /*prevents 24:09*/,
    weekday: "short",
  };

  const addDoses = (numDoses) => {
    const startTimeCopy = new Date(startTime);
    const totalHours = numDoses * freq;
    const dateObj = startTimeCopy.setTime(
      startTimeCopy.getTime() + totalHours * 60 * 60 * 1000
    );
    return new Intl.DateTimeFormat("en-US", options).format(dateObj);
  };

  const doseTiming = [
    ...(loadingDose ? [loadingDose] : []),
    dose + " mg",
    dose + " mg",
    dose + " mg",
    dose + " mg",
    dose + " mg",
    ...(loadingDose ? [] : [dose + " mg"]),
  ];

  return (
    <Flex direction="column" gap="0.5rem" fontSize="0.8rem">
      {doseTiming.map((d, i) => (
        <Text key={d + i} color="grayTextToken">
          {i + 1}. {d} {addDoses(i)}{" "}
          {i === peakValue && ` peak after ${peakStr} on ${peakTime}`}{" "}
          {i === troughValue && ` trough before ${troughStr} on ${troughTime}`}
        </Text>
      ))}
    </Flex>
  );
}
