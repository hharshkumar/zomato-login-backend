import { Browser, BrowserContext, Page, chromium } from "playwright";

export const launchBrowser = async (): Promise<{
  browser: Browser;
  context: BrowserContext;
  page: Page;
}> => {
  try {
    const browser = await chromium.launch({ headless: false });
    const context = await browser.newContext();
    const page = await context.newPage();
    return { browser, context, page };
  } catch (error) {
    console.error("[Browser Launch Error]:", (error as Error).message);
    throw new Error("Browser initialization failed.");
  }
};
