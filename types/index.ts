export type Portfolio = {
  mine: number
  invistor: number
}

export type Position = {
  value: number
  lot: number
  currencyPair: string
}

export type IdPosition = Position & {
  id: string
}

export type ValueShareType = {
  title: string
  value: number
}
