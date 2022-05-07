import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  FormHelperText,
} from "@chakra-ui/react";

export default function PtDemo() {
  return (
    <Flex gap="1em" justifyContent="center">
      <Box>
        <FormControl>
          <FormLabel htmlFor="age" color="gray">
            age
          </FormLabel>
          <Input
            // onChange={(e) => {
            //   handleChange(e.target.name, e.target.valueAsNumber);
            // }}
            id="age"
            name="age"
            type="number"
            placeholder="62"
            size="xs"
            min="2"
            max="120"
            variant="flushed"
            autoFocus
            //isInvalid={age < 2 || age > 120}
          />
          <FormErrorMessage>Error Detected</FormErrorMessage>
        </FormControl>
      </Box>

      <Box>
        <FormControl>
          <FormLabel htmlFor="scr" color="gray">
            creatnine
          </FormLabel>
          <InputGroup size="xs">
            <Input
              // onChange={(e) => {
              //   const correctedScr = convScr(e.target.valueAsNumber);
              //   handleChange(e.target.name, correctedScr);
              // }}
              type="number"
              step="0.01"
              min="0.01"
              max="20"
              id="scr"
              name="scr"
              placeholder="0.9"
              variant="flushed"
              // isInvalid={scr < 0.01 || scr > 20}
            />
            <InputRightElement pointerEvents="none" children={"mg/dL"} />
          </InputGroup>
          {/* {ageFactor && (
            <FormHelperText fontSize="0.7em">
              consider rounding up
            </FormHelperText>
          )} */}
        </FormControl>
      </Box>
    </Flex>
  );
}
