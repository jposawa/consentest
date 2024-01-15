import { atom } from "recoil";
import { withPrefix } from "../utils";

export const serverInstanceState = atom({
  key: withPrefix("serverInstance"),
  default: null,
});