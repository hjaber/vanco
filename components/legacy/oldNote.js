import { useState } from "react";
import { Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import Chart from "@/components/legacy/chart";
export default function Note({ loadingDose, selectedDose }) {
  const { dose, freq, infusionTime, peak, trough } = selectedDose;
  const options = {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23" /*prevents 24:09*/,
    weekday: "short",
  };

  const [startTime, setStartTime] = useState(new Date());
  const startTimeStr = new Intl.DateTimeFormat("en-US", options).format(
    startTime
  );

  const getPeak = (numDoses) => {
    const startTimeCopy = new Date(startTime);
    const peakHours = numDoses * freq + infusionTime + 1;
    const peakObj = startTimeCopy.setTime(
      startTimeCopy.getTime() + peakHours * 60 * 60 * 1000
    );
    return new Intl.DateTimeFormat("en-US", options).format(peakObj);
  };

  const getTrough = (numDoses) => {
    const startTimeCopy = new Date(startTime);
    const troughHours = numDoses * freq - 0.5;
    const troughObj = startTimeCopy.setTime(
      startTimeCopy.getTime() + troughHours * 60 * 60 * 1000
    );
    return new Intl.DateTimeFormat("en-US", options).format(troughObj);
  };

  const handleStartTimeChange = (e) => {
    const dateObj = new Date(e.target.value);
    setStartTime(dateObj);
  };

  return (
    <Flex direction="column" gap="0.5rem">
      <Flex gap="1rem">
        <FormControl>
          <FormLabel
            htmlFor="firstDose"
            color="grayTextToken"
            textAlign="center"
          >
            first dose given
          </FormLabel>
          <Input
            type="datetime-local"
            onChange={handleStartTimeChange}
            id="firstDose"
            name="firstDose"
            size="xs"
            variant="flushed"
            m="auto"
          />
        </FormControl>
      </Flex>
      <Flex direction="column" fontSize="0.8rem">
        <Text>
          {loadingDose
            ? `1. Initiated vancomycin ${loadingDose} on ${startTimeStr} followed by ${dose} mg IV Q${freq}H`
            : `1. Initiated vancomycin ${dose} mg IV Q${freq}H on ${startTimeStr} followed by${" "}
          ${dose} mg IV Q${freq}H`}
        </Text>
        <Text>
          2. Peak ordered on {getPeak(peak)} (1 hour after end of{" "}
          {peak === 3 ? "3rd" : `${peak}th`}
          ). Trough ordered on {getTrough(peak - 1)} (30 min before {peak + 1}
          th dose).
        </Text>
      </Flex>
      <Chart
        peak={peak}
        dose={dose}
        freq={freq}
        loadingDose={loadingDose}
        peakTime={getPeak(peak)}
        startTime={startTime}
        troughTime={getTrough(trough)}
      />
    </Flex>
  );
}
