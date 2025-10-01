import { Builder, By } from "selenium-webdriver";

const driver = new Builder().forBrowser('chrome').build()

beforeAll(async () => {
  // Increase timeout for hook
  jest.setTimeout(30000)
  try {
    await driver.get('http://localhost:8888/')
    // Wait for page to load
    await driver.manage().setTimeouts({ implicit: 10000 })
  } catch (error) {
    console.error('Failed to connect to localhost:8888. Make sure the dev server is running.')
    throw error
  }
}, 30000)

afterAll(async () => {
  await driver.quit()
}, 10000)

describe('renders UI', () => {
  test('logo', async () => {
    await driver.manage().setTimeouts({implicit: 10000})
    const logo = await driver.findElement(By.css('img')).isDisplayed()
    expect(logo).toBe(true)
  }, 15000)

  test('title', async () => {
    const title = await driver.findElement(By.css('span')).getText()
    expect(title).toContain('Reddit Client')
  }, 15000)

  test('links', async () => {
    const links = await driver.findElements(By.css('a'))
    expect(links.length).toBeGreaterThanOrEqual(4)
  }, 15000)

  test('input', async () => {
    const input = await driver.findElement(By.css('input'))
    const placeholder = await input.getAttribute('placeholder')
    expect(placeholder).toBe('Search Reddit')
  }, 15000)
})