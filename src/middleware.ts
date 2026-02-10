import { defineMiddleware } from 'astro:middleware'
import { getThemeFromCookie } from '@lib/theme-store'

export const onRequest = defineMiddleware((context, next) => {
  const cookieHeader = context.request.headers.get('cookie')
  context.locals.theme = getThemeFromCookie(cookieHeader)
  return next()
})
