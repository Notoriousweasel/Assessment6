const { Builder, Browser, By, until } = require("selenium-webdriver");

let driver;

beforeEach(async () => {
  driver = await new Builder().forBrowser(Browser.CHROME).build();
});

afterEach(async () => {
  await driver.quit();
});

describe("Duel Duo tests", () => {
  test("page loads with title", async () => {
    await driver.get("http://localhost:8000");
    await driver.wait(until.titleIs("Duel Duo"), 1000);
  });

  test('Draw button displays the div with id=choices', async () => {
    await driver.get('http://localhost:8000');
    await driver.findElement(By.css('#draw')).click();

    const choicesDiv = await driver.findElement(By.id('choices'));
    const isDisplayed = await choicesDiv.isDisplayed();
    
    expect(isDisplayed).toBe(true);
  });

  test('when a bot is "Removed from Duo", it goes back to "choices"', async () => {
    await driver.get('http://localhost:8000');
    await driver.findElement(By.css('#draw')).click();

    const choicesDiv = await driver.findElement(By.id('choices'));
    const intialBotLen = await choicesDiv.findElements(By.xpath('//button[text()="Add to Duo]'));

    console.log('intitial '+intialBotLen.length);

    await driver.findElement(By.xpath('//*[text()="Add to Duo"]')).click();

    let updatedChoicesBots = await choicesDiv.findElements(By.xpath('//button[text(0="Add to Duo"]'));
    console.log('length after adding to player duo '+updatedChoicesBots.length);

    await driver.findElement(By.xpath('//*[text()="Remove from Duo"]')).click();

    updatedChoicesBots = await choicesDiv.findElements(By.xpath('//button[text()="Add to Duo"]'));
    console.log('updatedLen '+updatedChoicesBots.length);

    expect(intialBotLen.length).toEqual(updatedChoicesBots.length);
    expect(intialBotLen).toEqual(updatedChoicesBots);
  })

});
