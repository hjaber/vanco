import {
  Box,
  FormControl,
  // FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

export default function Weight({ weight, handleChange }) {
  return (
    <Box>
      <FormControl isInvalid={weight < 20 || weight > 500}>
        <FormLabel htmlFor="weight" color="grayTextToken" textAlign="center">
          weight
        </FormLabel>
        <InputGroup size="xs">
          <Input
            type="number"
            step="0.01"
            id="weight"
            name="weight"
            onChange={(e) => {
              handleChange(e.target.name, e.target.valueAsNumber);
            }}
            variant="flushed"
            placeholder="73"
            min="20"
            max="500"
          />
          <InputRightElement>kg</InputRightElement>
        </InputGroup>
        {/* <FormErrorMessage>confirm</FormErrorMessage> */}
      </FormControl>
    </Box>
  );
}
