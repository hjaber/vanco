import { useState } from "react";
import { Flex, FormControl, FormLabel, Input, Text } from "@chakra-ui/react";
import LvlTiming from "@/components/vanco/lvlTiming";
import Chart from "@/components/vanco/chart";

export default function Note({ dose, freq, infusionTime, loadingDose }) {
  const lvls = [
    {
      label: (
        <span>
          3<sup>rd</sup>/4<sup>th</sup>
        </span>
      ),
      peak: 2,
      trough: 3,
      peakStr: "3rd dose",
      troughStr: "4th dose",
    },
    {
      label: (
        <span>
          4<sup>th</sup>/5<sup>th</sup>
        </span>
      ),
      peak: 3,
      trough: 4,
      peakStr: "4th dose",
      troughStr: "5th dose",
    },
    {
      label: (
        <span>
          5<sup>th</sup>/6<sup>th</sup>
        </span>
      ),
      peak: 4,
      trough: 5,
      peakStr: "5th dose",
      troughStr: "6th dose",
    },
  ];

  const options = {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23" /*prevents 24:09*/,
    weekday: "short",
  };

  const initialLvlState = freq < 13 ? lvls[1] : lvls[0];
  const [lvl, setLvl] = useState(initialLvlState);
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

            //defaultValue={firstDose}
            //value={firstDose}
            //"2017-06-01T08:30"
          />
        </FormControl>

        <Flex direction="column" gap="0.2rem" alignItems="center">
          <Text color="grayTextToken" fontSize="0.7rem">
            level timing
          </Text>

          <Flex gap="0.5rem">
            {lvls.map((l) => (
              <LvlTiming
                key={l.peakStr}
                label={l.label}
                peak={l.peak}
                trough={l.trough}
                peakStr={l.peakStr}
                troughStr={l.troughStr}
                lvl={lvl}
                setLvl={setLvl}
              />
            ))}
          </Flex>
        </Flex>
      </Flex>
      <Flex direction="column" fontSize="0.8rem">
        <Text>
          {loadingDose
            ? `1. Initiated vancomycin ${loadingDose} on ${startTimeStr} followed by ${dose} mg IV Q${freq}H`
            : `1. Initiated vancomycin ${dose} mg IV Q${freq}H on ${startTimeStr} followed by${" "}
          ${dose} mg IV Q${freq}H`}
          {/* 1. Initiated vancomycin {loadingDose} on {startTimeStr} followed by{" "}
          {dose} mg IV Q{freq}H */}
        </Text>
        <Text>
          2. Peak ordered on {getPeak(lvl.peak)} (1 hour after end of{" "}
          {lvl.peakStr}
          ). Trough ordered on {getTrough(lvl.trough)} (30 min before{" "}
          {lvl.troughStr}).
        </Text>
      </Flex>
      <Chart
        dose={dose}
        freq={freq}
        loadingDose={loadingDose}
        peakValue={lvl.peak}
        peakStr={lvl.peakStr}
        peakTime={getPeak(lvl.peak)}
        startTime={startTime}
        troughValue={lvl.trough}
        troughStr={lvl.troughStr}
        troughTime={getTrough(lvl.trough)}
      />
    </Flex>
  );
}
