import { formatDose, roundFormat } from "@/lib/helper";
import {
  Box,
  Flex,
  Slider,
  SliderFilledTrack,
  SliderThumb,
  SliderTrack,
  Text,
} from "@chakra-ui/react";
import { Temporal } from "@js-temporal/polyfill";
import { useState } from "react";

export default function Note({ freq, dose, infusionTime, peak, loadingDose }) {
  const [startTime, setStartTime] = useState(Temporal.Now.plainDateTimeISO());
  const stringDose = formatDose(dose);
  const doseTimes = [
    ...(loadingDose ? [loadingDose] : []),
    stringDose,
    stringDose,
    stringDose,
    stringDose,
    stringDose,
    ...(loadingDose ? [] : [stringDose]),
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
        first dose given
      </Text>
      <Text fontSize="0.7rem" alignSelf="center">
        {roundFormat(startTime)}
      </Text>
      <Slider
        onChange={(val) => handleSlider(val)}
        defaultValue={24}
        min={0}
        max={48}
        step={0.5}
        focusThumbOnChange={false}
        w={{ base: "70%", md: "40%" }}
        aria-label="first-dose time slider"
        alignSelf="center"
      >
        <SliderTrack>
          <Box position="relative" right={10} />
          <SliderFilledTrack bg="transparent" />
        </SliderTrack>
        <SliderThumb boxSize={6} bg="grayTextToken" />
      </Slider>
      <Flex direction="column" fontSize="0.8rem">
        <Text>
          {loadingDose
            ? `1. Initiated vancomycin ${loadingDose} on ${roundFormat(
                startTime
              )} followed by ${stringDose} IV Q${freq}H`
            : `1. Initiated vancomycin ${stringDose} IV Q${freq}H on ${roundFormat(
                startTime
              )} followed by${" "}
          ${stringDose} IV Q${freq}H`}
        </Text>
        <Text>
          2. Peak ordered on {getPeak(peak)} (1 hour after end of{" "}
          {peak === 3 ? "3rd" : `${peak}th`} dose). Trough ordered on{" "}
          {getTrough(peak - 1)} (30 min before {peak + 1}
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
