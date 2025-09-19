import { page } from '@vitest/browser/context';
import { describe, expect, it } from 'vitest';
import { render } from 'vitest-browser-svelte';
import Page from './+page.svelte';

describe('/+page.svelte', () => {
	it('should render new task btn', async () => {
		render(Page);
		
		const heading = page.getByTitle('New task');
		await expect.element(heading).toBeInTheDocument();
	});
});
