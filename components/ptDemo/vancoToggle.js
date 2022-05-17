import { Box, FormControl, FormLabel, Switch } from "@chakra-ui/react";

export default function VancoToggle({ handleChange, vancomycin }) {
  return (
    <Box>
      <FormControl display="flex" flexDirection="column" alignItems="center">
        <FormLabel fontSize="xs" color="gray" htmlFor="vancomycin">
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
      </FormControl>
    </Box>
  );
}
