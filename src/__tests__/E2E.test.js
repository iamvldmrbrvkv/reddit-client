import { Builder, By } from "selenium-webdriver";

const driver = new Builder().forBrowser('safari').build()

beforeAll(async () => await driver.get('http://localhost:3000/'))

afterAll(async () => await driver.quit())

describe('renders UI', () => {
  test('logo', async () => {
    await driver.manage().setTimeouts({implicit: 500})
    const logo = await driver.findElement(By.css('img')).isDisplayed()
    expect(logo).toBe(true)
  })

  test('title', async () => {
    const title = await driver.findElement(By.css('h1')).getText()
    expect(title).toContain('Reddit Client')
  })

  test('links', async () => {
    const links = await driver.findElements(By.css('a'))
    expect(links).toHaveLength(4)
  })

  test('input', async () => {
    const input = await driver.findElement(By.css('input')).getText()
    expect(input).toEqual('')
  })
})