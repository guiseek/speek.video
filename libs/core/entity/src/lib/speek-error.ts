export class SpeekError {
  constructor(
    public error: Error,
    public version?: string,
    public component?: string,
    public description?: string
  ) {}
}
