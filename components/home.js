import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import PtDemo from "@/components/ptDemo/index";
import dynamic from "next/dynamic";

export default function Home() {
  const DarkMode = dynamic(() => import("@/components/darkMode"));
  const [pt, setPt] = useState({
    gender: "male",
  });
  console.log(pt);

  const handleChange = (name, value) => {
    setPt({ ...pt, [name]: value });
    //batch draft update
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
        </Flex>
      </form>
    </Box>
  );
}
