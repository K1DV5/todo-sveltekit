import { locales } from 'virtual:wuchale/locales'
import { browser } from '$app/environment'
import { loadLocale } from 'wuchale/load-utils'
// so that the loaders are registered
import '../locales/loader.svelte.js'
import type { LayoutLoad } from './$types.js'

export const load: LayoutLoad = async ({params}) => {
    const locale = params.locale ?? 'en'
    if (!locales.includes(locale)) {
        return
    }
    if (browser) {
        await loadLocale(locale)
    }
    return {
        locale,
    }
}
