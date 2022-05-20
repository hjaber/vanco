import { useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Radio,
  RadioGroup,
  Text,
} from "@chakra-ui/react";

export default function Note({ dose, freq, infusionTime }) {
  const thirdPeak = {
    peak: 2,
    trough: 3,
    peakStr: "3rd dose",
    troughStr: "4th dose",
    radioValue: "3",
  };

  const fourthPeak = {
    peak: 3,
    trough: 4,
    peakStr: "4th dose",
    troughStr: "5th dose",
    radioValue: "4",
  };

  const fifthPeak = {
    peak: 4,
    trough: 5,
    peakStr: "5th dose",
    troughStr: "6th dose",
    radioValue: "5",
  };

  const options = {
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    hourCycle: "h23" /*prevents 24:09*/,
    weekday: "short",
  };

  const initialState = freq < 13 ? fourthPeak : thirdPeak;
  const [lvl, setLvl] = useState(initialState);
  const [firstDose, setFirstDose] = useState(new Date());
  const formattedFirstDose = new Intl.DateTimeFormat("en-US", options).format(
    firstDose
  );

  const getPeak = (numDoses) => {
    const firstDoseTime = new Date(firstDose);
    const peakHours = numDoses * freq + infusionTime + 1;
    const peakObj = firstDoseTime.setTime(
      firstDoseTime.getTime() + peakHours * 60 * 60 * 1000
    );
    return new Intl.DateTimeFormat("en-US", options).format(peakObj);
  };

  const getTrough = (numDoses) => {
    const firstDoseTime = new Date(firstDose);
    const troughHours = numDoses * freq - 0.5;
    const troughObj = firstDoseTime.setTime(
      firstDoseTime.getTime() + troughHours * 60 * 60 * 1000
    );
    return new Intl.DateTimeFormat("en-US", options).format(troughObj);
  };

  const handleFirstDoseChange = (e) => {
    const dateObj = new Date(e.target.value);
    setFirstDose(dateObj);
  };

  const handleLvlChange = (e) => {
    //peak/trough set as peak - 1 and trough -1 to accurately calc timing
    if (e === "3") {
      setLvl(thirdPeak);
    }
    if (e === "4") {
      setLvl(fourthPeak);
    }
    if (e === "5") {
      setLvl(fifthPeak);
    }
  };

  return (
    <Flex direction="column" gap="0.5em">
      <Flex gap="1em">
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
            onChange={handleFirstDoseChange}
            id="firstDose"
            name="firstDose"
            size="xs"
            variant="flushed"

            //defaultValue={firstDose}
            //value={firstDose}
            //"2017-06-01T08:30"
          />
        </FormControl>

        <FormControl id="lvl" name="lvl">
          <FormLabel htmlFor="lvl" color="grayTextToken" textAlign="center">
            peak/trough
          </FormLabel>
          <RadioGroup
            name="lvl"
            //chakra radio group does not contain full event object, Radio does
            onChange={handleLvlChange}
            de="true"
            size="sm"
            defaultValue={lvl.radioValue}
            //value={firstDose.radioValue}
          >
            <Flex justifyContent="center" gap="0.5em">
              <Radio value="3" spacing="0.3em">
                3/4
              </Radio>
              <Radio value="4" spacing="0.3em">
                4/5
              </Radio>
              <Radio value="5" spacing="0.3em">
                5/6
              </Radio>
            </Flex>
          </RadioGroup>
        </FormControl>
      </Flex>
      <Flex direction="column" fontSize="0.8em">
        <Text>
          1. Initiated vancomycin {dose}mg IV Q{freq}H on {formattedFirstDose}
        </Text>
        <Text>
          2. Peak ordered on {getPeak(lvl.peak)} (1 hour after end of{" "}
          {lvl.peakStr}
          ). Trough ordered on {getTrough(lvl.trough)} (30 min before{" "}
          {lvl.troughStr}).
        </Text>
      </Flex>
    </Flex>
  );
}
