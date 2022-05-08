import { useState } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import PtDemo from "@/components/ptDemo/index";

export default function Home() {
  const [pt, setPt] = useState({
    gender: "male",
    loading: false,
  });
  console.log(pt);

  const handleChange = (name, value) => {
    setPt({ ...pt, [name]: value });
  };
  return (
    <Box>
      <form autoComplete="off">
        <Flex direction="column" gap="1em">
          <PtDemo handleChange={handleChange} pt={pt} setPt={setPt} />
          <Button
            variant="outline"
            size="xs"
            type="reset"
            onClick={() => {
              setPt({ icu: false, gender: "male", loading: false });
            }}
            boxShadow="md"
            m="auto"
          >
            Reset
          </Button>
        </Flex>
      </form>
    </Box>
  );
}
