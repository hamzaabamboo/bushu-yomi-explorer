import { join } from "path";

const base =  "";

export const getPath = (path: string) => {
  return join(base, path);
};
