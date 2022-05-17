import { Flex, SimpleGrid, Text } from "@chakra-ui/react";
import CrCl from "@/components/dosingWt/crCl";
import MetricCard from "@/components/dosingWt/metricCard";
import PkCard from "@/components/vanco/pkCard";

export default function OldWtCard({
  metrics,
  pks,
  pt,
  weights,
  crclWt,
  setCrclWt,
}) {
  return (
    <Flex gap="1em" direction="column">
      <SimpleGrid columns={3} spacing="0.8em" m="auto">
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

        {metrics.map((m) => (
          <MetricCard
            key={m.title}
            color={m.color}
            unit={m.unit}
            title={m.title}
            value={m.value}
          />
        ))}
        {pt.scr > 0.067 &&
          pks.map((pk) => (
            <PkCard
              key={pk.type}
              display={pk.display}
              type={pk.type}
              unit={pk.unit}
            />
          ))}
      </SimpleGrid>
      {/* {pt.scr > 0.067 && (
        <Vancomycin age={pt.age} weight={pt.weight} crcl={crclWt.crcl} />
      )} */}
    </Flex>
  );
}
