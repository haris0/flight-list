export interface Flight {
  id: string
  airline: Airline
  flightNumber: string
  departure: Departure
  arrival: Arrival
  duration: number
  baggage: string
  price: Price
}

export interface Airline {
  name: string
  code: string
}

export interface Route {
  time: string
  airport: string
  date: string
}

export type Departure = Route
export type Arrival = Route

export interface Price {
  amount: number
  currency: string
}
