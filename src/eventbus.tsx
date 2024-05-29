import EventEmitter from 'events';

export enum Events {
  noTicketSpin = 'noTicketSpin'
}

export interface EventMap {
  [Events.noTicketSpin]: [];
}

export const eventBus = new EventEmitter<EventMap>();
