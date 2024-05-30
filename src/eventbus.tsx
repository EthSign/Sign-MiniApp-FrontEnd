import EventEmitter from 'events';

export enum Events {
  noTicketSpin = 'noTicketSpin',
  spin = 'spin',
  raffleResultReceived = 'raffleResultReceived'
}

export interface EventMap {
  [Events.noTicketSpin]: [];
  [Events.spin]: [];
  [Events.raffleResultReceived]: [];
}

export const eventBus = new EventEmitter<EventMap>();
