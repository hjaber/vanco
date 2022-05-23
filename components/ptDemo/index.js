import { Button, Flex } from "@chakra-ui/react";
import Age from "@/components/ptDemo/age";
import Creatinine from "@/components/ptDemo/creatinine";
import Weight from "@/components/ptDemo/weight";
import Height from "@/components/ptDemo/height";
import Gender from "@/components/ptDemo/gender";
import VancoToggle from "@/components/ptDemo/vancoToggle";

export default function PatientInfo({ handleChange, pt, setPt }) {
  return (
    <Flex direction="column" gap="1rem">
      <Flex
        gap="1rem"
        flexWrap="wrap"
        justifyContent="space-around"
        alignItems="center"
      >
        <Age handleChange={handleChange} age={pt.age} />
        <Creatinine handleChange={handleChange} scr={pt.scr} age={pt.age} />
        <Weight handleChange={handleChange} weight={pt.weight} />
        <Height handleChange={handleChange} height={pt.height} />
        <Gender handleChange={handleChange} gender={pt.gender} />
        <VancoToggle handleChange={handleChange} vancomycin={pt.vancomycin} />
      </Flex>

      <Button
        variant="outline"
        size="xs"
        type="reset"
        onClick={() => {
          setPt({ gender: "male", vancomycin: false });
        }}
        boxShadow="md"
        m="auto"
      >
        reset
      </Button>
    </Flex>
  );
}
