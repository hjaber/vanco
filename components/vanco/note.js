import { useState } from "react";
import {
  Box,
  Flex,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  Text,
} from "@chakra-ui/react";
import { Temporal } from "@js-temporal/polyfill";
import { roundFormat } from "@/lib/helper";

export default function Note({ freq, dose, infusionTime, peak, loadingDose }) {
  const [startTime, setStartTime] = useState(Temporal.Now.plainDateTimeISO());
  const doseTimes = [
    ...(loadingDose ? [loadingDose] : []),
    dose + " mg",
    dose + " mg",
    dose + " mg",
    dose + " mg",
    dose + " mg",
    ...(loadingDose ? [] : [dose + " mg"]),
  ];

  const getPeak = () => {
    const peakHours = (peak - 1) * freq + infusionTime + 1;
    const peakMinutes = peakHours * 60;
    const newPeak = startTime.add({ minutes: peakMinutes });
    return roundFormat(newPeak);
  };

  const getTrough = () => {
    const troughHours = peak * freq - 0.5;
    const troughMinutes = troughHours * 60;
    const newTrough = startTime.add({ minutes: troughMinutes });
    return roundFormat(newTrough);
  };

  const doseTiming = (doseNum) => {
    const doseHours = freq * doseNum;
    const doseMinutes = doseHours * 60;
    const newDoseTime = roundFormat(startTime.add({ minutes: doseMinutes }));
    return newDoseTime;
  };

  const handleSlider = (val) => {
    const baselineVal = val - 24;
    const minutes = baselineVal * 60;
    const baselineTime = Temporal.Now.plainDateTimeISO();
    const newStartTime = baselineTime.add({ minutes: minutes });
    return setStartTime(newStartTime);
  };

  return (
    <Flex direction="column" gap="0.5rem">
      <Text color="grayTextToken" fontSize="0.7rem" alignSelf="center">
        first dose given {roundFormat(startTime)}
      </Text>
      <Slider
        onChange={(val) => handleSlider(val)}
        defaultValue={24}
        min={0}
        max={48}
        step={0.5}
        focusThumbOnChange={false}
        w="80vw"
        aria-label="first-dose time slider"
      >
        <SliderTrack>
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="transparent" />
        </SliderTrack>
        <SliderThumb boxSize={6} bg="gray.400" />
      </Slider>
      <Flex direction="column" fontSize="0.8rem">
        <Text>
          {loadingDose
            ? `1. Initiated vancomycin ${loadingDose} on ${roundFormat(
                startTime
              )} followed by ${dose} mg IV Q${freq}H`
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
      <Flex direction="column" gap="0.5rem" fontSize="0.8rem">
        {doseTimes.map((d, i) => (
          <Text key={i} color="grayTextToken">
            {i + 1}. {d} {doseTiming(i)}{" "}
            {i + 1 === peak &&
              ` peak after ${
                peak === 3 ? "3rd" : `${peak}th`
              } dose on ${getPeak()}`}{" "}
            {i === peak &&
              ` trough before ${peak + 1}th dose on ${getTrough()}`}
          </Text>
        ))}
      </Flex>
    </Flex>
  );
}
