// theme/index.js
import { extendTheme } from "@chakra-ui/react";
import styles from "@/theme/styles";
import { customColors as colors } from "@/theme/colors";
import { tokens as semanticTokens } from "@/theme/tokens";
import { darkMode as config } from "@/theme/darkMode";
import { customFormLabel as FormLabel } from "@/theme/components/customFormLabel";

const overrides = {
  colors,
  config,
  styles,
  semanticTokens,
  components: {
    FormLabel,
  },
};
export default extendTheme(overrides);
