import config from "@payload.config";
import { getPayload } from "payload";
export const payloadPromise = getPayload({ config: config });
