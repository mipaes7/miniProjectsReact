// @ts-check
import { test, expect } from '@playwright/test'

const LOCALHOST_URL = 'http://localhost:5173/'

test('app shows random image', async ({ page }) => {
  await page.goto(LOCALHOST_URL);

  const text = await page.getByRole('paragraph')
  const img = await page.getByRole('img')
  const refreshBtn = await page.getByRole('button')

  const textContent = await text.textContent()
  const imgSrc = await img.getAttribute('src')

  // Expect a title "to contain" a substring.
  await expect(textContent?.length).toBeGreaterThan(0)
  await expect(imgSrc).toContain('cataas')
  
});

