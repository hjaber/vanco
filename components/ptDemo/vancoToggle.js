import { Box, Flex, FormLabel, Switch } from "@chakra-ui/react";

export default function VancoToggle({ handleChange, vancomycin }) {
  return (
    <Box>
      <Flex direction="column" alignItems="center">
        <FormLabel fontSize="xs" color="grayTextToken" htmlFor="vancomycin">
          vancomycin
        </FormLabel>
        <Switch
          id="vancomycin"
          name="vancomycin"
          onChange={(e) => {
            handleChange(e.target.name, e.target.checked);
          }}
          size="sm"
          isChecked={vancomycin}
        />
      </Flex>
    </Box>
  );
}
