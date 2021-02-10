import { SpeekData } from "./speek-data";

export interface SpeekPayload {
  sender: string
  code: string
  data?: SpeekData
}

export class SpeekPayload {
  constructor(
    public sender: string,
    public code: string,
    public data?: SpeekData
  ) {}
}
