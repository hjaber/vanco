import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";

export default function Height({ handleChange, height }) {
  return (
    <Box>
      <FormControl isInvalid={height < 50 || height > 96}>
        <FormLabel htmlFor="height" color="gray" textAlign="center">
          height
        </FormLabel>
        <InputGroup size="xs">
          <Input
            type="number"
            step="0.01"
            id="height"
            name="height"
            onChange={(e) => {
              handleChange(e.target.name, e.target.valueAsNumber);
            }}
            variant="flushed"
            placeholder="65"
            min="50"
            max="96"
          />
          <InputRightElement>in</InputRightElement>
        </InputGroup>
        <FormErrorMessage>confirm height</FormErrorMessage>
      </FormControl>
    </Box>
  );
}
