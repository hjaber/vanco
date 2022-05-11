import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";

export default function Age({ age, handleChange }) {
  return (
    <Box>
      <FormControl isInvalid={age < 2 || age > 120}>
        <FormLabel htmlFor="age" color="gray" textAlign="center">
          age
        </FormLabel>
        <Input
          onChange={(e) => {
            handleChange(e.target.name, e.target.valueAsNumber);
          }}
          id="age"
          name="age"
          type="number"
          placeholder="62"
          size="xs"
          min="2"
          max="120"
          variant="flushed"
          autoFocus
        />
        <FormErrorMessage>confirm age</FormErrorMessage>
      </FormControl>
    </Box>
  );
}
