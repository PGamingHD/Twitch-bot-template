import { Events } from "tmi.js";

export class Event<Key extends keyof Events> {
  constructor(
    public event: Key,
    public run: (...args: Parameters<Events[Key]>) => void
  ) {}
}
