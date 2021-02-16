export class Warning {
  constructor(
    public error: Error,
    public version?: string,
    public component?: string,
    public description?: string
  ) {}
}
