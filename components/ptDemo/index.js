import { Flex } from "@chakra-ui/react";
import Age from "@/components/ptDemo/age";
import Creatinine from "@/components/ptDemo/creatinine";
import Weight from "@/components/ptDemo/weight";
import Height from "@/components/ptDemo/height";
import Gender from "@/components/ptDemo/gender";

export default function PatientInfo({ handleChange, pt, setPt }) {
  return (
    <Flex direction="column" gap="0.5em">
      <Flex
        gap="1em"
        //direction={{ base: "column", md: "row" }}
        flexWrap="wrap"
        justifyContent="space-around"
      >
        <Age handleChange={handleChange} age={pt.age} />
        <Creatinine handleChange={handleChange} scr={pt.scr} age={pt.age} />
        <Weight
          handleChange={handleChange}
          weight={pt.weight}
          state={pt}
          setPt={setPt}
        />
        <Height handleChange={handleChange} height={pt.height} />
        <Gender handleChange={handleChange} gender={pt.gender} />
      </Flex>

      {/* {state.weight > 20 && state.height > 50 && state.age > 10 && (
        <DosingWeight {...{ setState, state }} />
      )} */}
    </Flex>
  );
}
