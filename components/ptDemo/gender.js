import {
  Box,
  Flex,
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
} from "@chakra-ui/react";

export default function Gender({ handleChange, gender }) {
  return (
    <Box>
      <FormControl id="gender" name="gender">
        <FormLabel htmlFor="gender" color="gray" textAlign="center">
          gender
        </FormLabel>
        <RadioGroup
          name="gender"
          //chakra Radiogroup does not contain full event object, Radio does
          onChange={(e) => {
            handleChange("gender", e);
          }}
          defaultValue="male"
          size="sm"
          value={gender}
        >
          <Flex
            direction={{ base: "row", md: "column" }}
            alignItems="center"
            justifyContent="center"
            gap="0.5em"
          >
            <Radio value="male" spacing="0.3em">
              male
            </Radio>
            <Radio value="female" spacing="0.3em">
              female
            </Radio>
          </Flex>
        </RadioGroup>
      </FormControl>
    </Box>
  );
}
