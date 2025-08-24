import { customAlphabet } from "nanoid";

const alphabet =
	"abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
export const nanoid = customAlphabet(alphabet, 8);
