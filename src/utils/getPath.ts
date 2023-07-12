import { join } from "path";

const base = process.env.NEXT_PUBLIC_BASE_URL || "";

export const getPath = (path: string) => {
  return join(base, path);
};
