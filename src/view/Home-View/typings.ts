type DailyRecommendResource = {
  id: number
  name: string
  picUrl: string
}

export type State = {
  dailyRecommendResource: DailyRecommendResource[]
}
