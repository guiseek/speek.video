export const notNull = (val: any) => val !== null
export const isDefined = (val: any) => val !== undefined

export const notNullForce = (val: any) => notNull(val) && val !== 'null'
export const isDefinedForce = (val: any) =>
  isDefined(val) && val !== 'undefined'
