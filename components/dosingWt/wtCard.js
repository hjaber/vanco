import { useState } from "react";
import { Flex, Text } from "@chakra-ui/react";
import CrCl from "@/components/dosingWt/crCl";
import Vancomycin from "@/components/vanco/index";

export default function WtCard({ pt, renalWt, weights }) {
  const [crclWt, setCrclWt] = useState(renalWt);

  return (
    <Flex gap="1em" direction="column">
      <Flex gap="0.7em" justifyContent="center">
        {weights.map((wt) => (
          <Flex
            key={wt.type}
            onClick={() =>
              setCrclWt({
                crcl: wt.crcl,
                type: wt.type,
                value: wt.value,
              })
            }
            direction="column"
            gap="0.2em"
            alignItems="center"
            borderRadius="lg"
            borderWidth="3px"
            borderColor="transparent"
            bgColor={crclWt.type === wt.type ? "grayBgToken" : "bgToken"}
            _hover={{
              transition: "0.1s ease-in",
              cursor: "pointer",
              borderWidth: "3px",
              borderColor: "grayHoverToken",
            }}
            transition="0.5s ease-in" /* hover off transition */
            p={1} /* give borderRadius background extra space */
          >
            <Text color="grayTextToken" fontSize="0.8em">
              {wt.type}
            </Text>
            <Text fontSize="0.8em">{wt.value} kg</Text>
            {/* scr > 0.067 comes from the IDMS to conventional SCr conversion, min scr value = 0.067 */}
            {pt.scr > 0.067 && <CrCl crcl={wt.crcl} />}
          </Flex>
        ))}
      </Flex>
      {/* TODO move vanco up to parent component and destructure index of dosingWt*/}
      <Vancomycin age={pt.age} weight={pt.weight} crcl={crclWt.crcl} />
    </Flex>
  );
}
