// theme/index.js
import { extendTheme } from "@chakra-ui/react";
import styles from "./styles";
import { customColors as colors } from "./colors";
import { tokens as semanticTokens } from "./tokens";
import { darkMode as config } from "./darkMode";

const overrides = {
  colors,
  config,
  styles,
  semanticTokens,
};
export default extendTheme(overrides);
