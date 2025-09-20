import { loadCatalog, loadIDs, key } from './locales/loader.ssr.svelte.js'
import { runWithLocale, loadLocales } from 'wuchale/load-utils/server'
import { locales } from 'virtual:wuchale/locales'
import type { Handle } from '@sveltejs/kit'

// load at server startup
loadLocales(key, loadIDs, loadCatalog, locales)

export const handle: Handle = async ({ event, resolve }) => {
    const locale = event.params.locale ?? 'en'
    return await runWithLocale(locale, () => resolve(event))
}
