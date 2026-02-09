export interface SiteConfig {
  name: string
  tagline: string
  phone: string
  email: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  hours: {
    weekday: string
    saturday: string
    sunday: string
  }
  serviceAreas: string[]
  social: {
    facebook: string
    instagram: string
    yelp: string
  }
  seo: {
    defaultTitle: string
    titleTemplate: string
    defaultDescription: string
  }
}

export const siteConfig: SiteConfig = {
  name: 'CleanSpark',
  tagline: 'Sparkle. Every time.',
  phone: '(206) 555-2532',
  email: 'hello@cleanspark.com',

  address: {
    street: '1234 Pine Street, Suite 200',
    city: 'Seattle',
    state: 'WA',
    zip: '98101',
  },

  hours: {
    weekday: 'Monday \u2013 Friday: 8:00 AM \u2013 6:00 PM',
    saturday: 'Saturday: 9:00 AM \u2013 4:00 PM',
    sunday: 'Sunday: Closed',
  },

  serviceAreas: [
    'Seattle',
    'Bellevue',
    'Redmond',
    'Kirkland',
    'Mercer Island',
    'Bothell',
    'Renton',
    'Issaquah',
    'Sammamish',
    'Woodinville',
  ],

  social: {
    facebook: 'https://facebook.com/cleanspark',
    instagram: 'https://instagram.com/cleansparkseattle',
    yelp: 'https://yelp.com/biz/cleanspark-seattle',
  },

  seo: {
    defaultTitle: 'CleanSpark \u2014 Professional Cleaning Services in Seattle',
    titleTemplate: '%s | CleanSpark',
    defaultDescription:
      'Seattle\u2019s trusted cleaning service. Residential, commercial, and specialty cleaning with 5-star reviews. Book your clean today.',
  },
}

export function getFullAddress(config: SiteConfig = siteConfig): string {
  const { street, city, state, zip } = config.address
  return `${street}, ${city}, ${state} ${zip}`
}
