export type WithTarget<T> = Event & {
  target: T
}

export type EventWithTarget<E = Event, T = HTMLElement> = E & {
  target: T
}
