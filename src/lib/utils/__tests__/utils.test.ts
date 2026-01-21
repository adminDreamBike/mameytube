import {
  getCategories,
  YTDurationToSeconds,
  formatViews,
  formatDuration,
  formatUploadDate,
  getVideoId,
} from '@/lib/utils/utils'
import { VideoId } from '@/types/video'

describe('getCategories', () => {
  it('should return an array of 18 categories', () => {
    const categories = getCategories()
    expect(categories).toHaveLength(18)
  })

  it('should return categories with correct structure', () => {
    const categories = getCategories()
    expect(categories[0]).toEqual({ 1: 'Film & Animation' })
    expect(categories[2]).toEqual({ 10: 'Music' })
  })
})

describe('YTDurationToSeconds', () => {
  it('should return 0 for null or undefined duration', () => {
    expect(YTDurationToSeconds(null)).toBe(0)
    expect(YTDurationToSeconds(undefined)).toBe(0)
    expect(YTDurationToSeconds('')).toBe(0)
  })

  it('should convert PT1H2M3S to 3723 seconds', () => {
    expect(YTDurationToSeconds('PT1H2M3S')).toBe(3723)
  })

  it('should convert PT15M30S to 930 seconds', () => {
    expect(YTDurationToSeconds('PT15M30S')).toBe(930)
  })

  it('should convert PT45S to 45 seconds', () => {
    expect(YTDurationToSeconds('PT45S')).toBe(45)
  })

  it('should convert PT2H to 7200 seconds', () => {
    expect(YTDurationToSeconds('PT2H')).toBe(7200)
  })

  it('should convert PT30M to 1800 seconds', () => {
    expect(YTDurationToSeconds('PT30M')).toBe(1800)
  })

  it('should handle single digit values', () => {
    expect(YTDurationToSeconds('PT1H1M1S')).toBe(3661)
  })

  it('should handle edge case with only hours', () => {
    expect(YTDurationToSeconds('PT10H')).toBe(36000)
  })
})

describe('formatViews', () => {
  it('should return "0" for 0 views', () => {
    expect(formatViews(0)).toBe('0')
  })

  it('should return number as string for views less than 1000', () => {
    expect(formatViews(500)).toBe('500')
    expect(formatViews(999)).toBe('999')
  })

  it('should format thousands with K suffix', () => {
    expect(formatViews(1000)).toBe('1.0K')
    expect(formatViews(5500)).toBe('5.5K')
    expect(formatViews(999999)).toBe('1000.0K')
  })

  it('should format millions with M suffix', () => {
    expect(formatViews(1000000)).toBe('1.0M')
    expect(formatViews(2500000)).toBe('2.5M')
    expect(formatViews(10000000)).toBe('10.0M')
  })

  it('should handle edge cases', () => {
    expect(formatViews(1500000)).toBe('1.5M')
    expect(formatViews(999000)).toBe('999.0K')
  })
})

describe('formatDuration', () => {
  it('should return "0s" for empty duration', () => {
    expect(formatDuration('')).toBe('0s')
  })

  it('should format hours, minutes, and seconds', () => {
    expect(formatDuration('PT1H2M3S')).toBe('1h 2m 3s')
  })

  it('should format minutes and seconds', () => {
    expect(formatDuration('PT15M30S')).toBe('15m 30s')
  })

  it('should format only seconds', () => {
    expect(formatDuration('PT45S')).toBe('45s')
  })

  it('should format only hours', () => {
    expect(formatDuration('PT2H')).toBe('2h')
  })

  it('should format only minutes', () => {
    expect(formatDuration('PT30M')).toBe('30m')
  })

  it('should not show zero values except when duration is 0', () => {
    expect(formatDuration('PT1H3S')).toBe('1h 3s')
    expect(formatDuration('PT1H30M')).toBe('1h 30m')
  })

  it('should handle edge case with 0 seconds', () => {
    expect(formatDuration('PT0S')).toBe('0s')
  })
})

describe('formatUploadDate', () => {
  beforeEach(() => {
    jest.useFakeTimers()
    jest.setSystemTime(new Date('2024-01-15T12:00:00Z'))
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('should return "Today" for today\'s date', () => {
    const today = new Date('2024-01-15T10:00:00Z').toISOString()
    expect(formatUploadDate(today)).toBe('Today')
  })

  it('should return "Yesterday" for yesterday\'s date', () => {
    const yesterday = new Date('2024-01-14T10:00:00Z').toISOString()
    expect(formatUploadDate(yesterday)).toBe('Yesterday')
  })

  it('should return days ago for dates within a week', () => {
    const threeDaysAgo = new Date('2024-01-12T10:00:00Z').toISOString()
    expect(formatUploadDate(threeDaysAgo)).toBe('3 days ago')
  })

  it('should return weeks ago for dates within a month', () => {
    const twoWeeksAgo = new Date('2024-01-01T10:00:00Z').toISOString()
    expect(formatUploadDate(twoWeeksAgo)).toBe('2 weeks ago')
  })

  it('should return months ago for dates within a year', () => {
    const twoMonthsAgo = new Date('2023-11-15T10:00:00Z').toISOString()
    expect(formatUploadDate(twoMonthsAgo)).toBe('2 months ago')
  })

  it('should return years ago for dates older than a year', () => {
    const twoYearsAgo = new Date('2022-01-15T10:00:00Z').toISOString()
    expect(formatUploadDate(twoYearsAgo)).toBe('2 years ago')
  })

  it('should handle edge case at 7 days boundary', () => {
    const sevenDaysAgo = new Date('2024-01-08T10:00:00Z').toISOString()
    expect(formatUploadDate(sevenDaysAgo)).toBe('1 weeks ago')
  })
})

describe('getVideoId', () => {
  it('should return string id as-is', () => {
    const id = 'abc123'
    expect(getVideoId(id)).toBe('abc123')
  })

  it('should extract videoId from object', () => {
    const id: VideoId = {
      kind: 'youtube#video',
      videoId: 'xyz789',
    }
    expect(getVideoId(id)).toBe('xyz789')
  })

  it('should return undefined for undefined input', () => {
    expect(getVideoId(undefined)).toBeUndefined()
  })

  it('should handle object with only kind property', () => {
    const id = {
      kind: 'youtube#video',
    } as VideoId
    expect(getVideoId(id)).toBeUndefined()
  })
})
