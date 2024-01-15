import { atom } from "recoil";
import { withPrefix } from "../utils";

export const currentThemeState = atom({
  key: withPrefix("currentTheme"),
  default: "lightTheme",
});