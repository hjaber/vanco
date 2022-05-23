import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import PtDemo from "@/components/ptDemo/index";
import DosingWt from "@/components/dosingWt/index";
import dynamic from "next/dynamic";

export default function Home() {
  const DarkMode = dynamic(() => import("@/components/darkMode"));
  const [pt, setPt] = useState({
    gender: "male",
  });
  console.log(pt);

  const handleChange = (name, value) => {
    setPt({ ...pt, [name]: value });
    //consider batch update of idealWt
    //setPt((v) => ({ ...v, weight: v.weight + 10 }));
  };
  return (
    <Box>
      <form autoComplete="off">
        <Flex direction="column" gap="1rem">
          <Box alignSelf="end">
            <DarkMode />
          </Box>
          <PtDemo handleChange={handleChange} pt={pt} setPt={setPt} />
          {pt.weight > 20 && pt.height > 50 && pt.age > 10 && (
            //key given to DosingWt to reset useState(renalWt) on each change/render of gender/scr
            <DosingWt pt={pt} key={pt.gender + pt.scr} />
          )}
        </Flex>
      </form>
    </Box>
  );
}
