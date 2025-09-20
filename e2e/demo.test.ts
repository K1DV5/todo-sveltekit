import { expect, test } from '@playwright/test';

test('Whole workflow', async ({ page }) => {
    const taskTitle = 'Test task todo - test'
	await page.goto('/');
    const newBtn = page.locator('a[href="/en/task/new"]')
	await expect(newBtn).toBeVisible();
    newBtn.click()
    const title = page.locator('input[name="title"]')
	await expect(title).toBeVisible();
    title.fill(taskTitle)
    page.getByText('Add').click()
    const addedTask = page.getByText(taskTitle)
    await expect(addedTask).toBeVisible()
    addedTask.click()
    const deleteTask = page.getByTitle('Delete task')
    await expect(deleteTask).toBeVisible()
    deleteTask.click()
    page.getByText('Yes').click()
    await expect(newBtn).toBeVisible()
});
