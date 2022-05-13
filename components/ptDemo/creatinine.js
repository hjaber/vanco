import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { convScr } from "@/lib/helper";

export default function Creatinine({ age, handleChange, scr }) {
  const ageFactor = age > 64 && scr < 0.9297;
  return (
    <Box>
      <FormControl isInvalid={scr < 0.01 || scr > 20}>
        <FormLabel htmlFor="scr" color="gray" textAlign="center">
          creatnine
        </FormLabel>
        <InputGroup size="xs">
          <Input
            onChange={(e) => {
              const correctedScr = convScr(e.target.valueAsNumber);
              handleChange(e.target.name, correctedScr);
            }}
            type="number"
            step="0.01"
            min="0.01"
            max="20"
            id="scr"
            name="scr"
            placeholder="0.9"
            variant="flushed"
          />
          <InputRightElement>
            <span>
              &nbsp;<sup>mg</sup>&frasl;<sub>dL</sub>
            </span>
          </InputRightElement>
        </InputGroup>
        {ageFactor && (
          <FormHelperText fontSize="0.7em">consider rounding up</FormHelperText>
        )}
        <FormErrorMessage>confirm</FormErrorMessage>
      </FormControl>
    </Box>
  );
}
