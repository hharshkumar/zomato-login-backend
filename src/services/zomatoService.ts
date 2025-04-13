import { Page, Browser } from "playwright";
import { launchBrowser } from "../config/playwrightConfig";
import { selectors } from "../utils/selectors";

let globalPage: Page | null = null;
let globalBrowser: Browser | null = null;

// Initiate Login
export const initiateLogin = async (mobileNumber: string): Promise<void> => {
  const { browser, page } = await launchBrowser();
  globalPage = page;
  globalBrowser = browser;

  try {
    await page.goto("https://www.zomato.com/india", {
      waitUntil: "domcontentloaded",
    });

    if (!(await page.isVisible(selectors.loginButton))) {
      throw new Error("Login button not found on the page.");
    }
    await page.click(selectors.loginButton);

    const frameLocator = page.frameLocator(selectors.frameIdSelector);
    if (!frameLocator) {
      throw new Error("Login frame not found.");
    }
    await frameLocator
      .getByPlaceholder(selectors.mobileNumberInput)
      .fill(mobileNumber);

    if (!(await frameLocator.locator(selectors.submitButton).isVisible())) {
      throw new Error("Submit button not found.");
    }
    await frameLocator.locator(selectors.submitButton).click();
  } catch (error) {
    console.error("[Login Error]:", (error as Error).message);
    await cleanupBrowser();
    throw new Error("Failed to initiate login.");
  }
};

// Submit OTP
export const submitOtp = async (otp: string): Promise<void> => {
  try {
    if (!globalPage) {
      throw new Error("Session expired. Please restart the login process.");
    }

    const frameLocator = globalPage.frameLocator(selectors.frameIdSelector);

    const otpArray = otp.split("");

    for (let i = 0; i < otpArray.length; i++) {
      await frameLocator
        .locator(selectors.otpInputSelector)
        .nth(i)
        .fill(otpArray[i]);
    }

    await delay(2000);

    if (await frameLocator.locator(selectors.optWarningSelector).isVisible()) {
      throw new Error(
        "The OTP entered is invalid/incorrect. Please try again."
      );
    }
  } catch (error) {
    console.error("[OTP Submission Error]:", (error as Error).message);
    await cleanupBrowser();
    throw new Error("OTP validation failed.");
  }
};

// Fetch User Info
export const fetchUserInfo = async (): Promise<{ userName: string }> => {
  try {
    if (!globalPage) {
      throw new Error("Session expired. Please restart the login process.");
    }

    if (!(await globalPage.isVisible(selectors.userNameSelector))) {
      throw new Error("User profile element not found.");
    }

    const extractedText = await globalPage
      .locator(selectors.userNameSelector)
      .textContent();

    if (!extractedText) {
      throw new Error("Failed to retrieve user information.");
    }

    return { userName: extractedText.trim() };
  } catch (error) {
    console.error("[Fetch User Info Error]:", (error as Error).message);
    throw new Error("Failed to fetch user information.");
  } finally {
    console.log("Browser resources have been cleaned up.");
    await cleanupBrowser();
  }
};

// Cleanup Browser
const cleanupBrowser = async (): Promise<void> => {
  try {
    console.log("Closing the browser...");
    if (globalBrowser && globalBrowser.contexts().length > 0) {
      await globalBrowser.close();
    }
    globalPage = null;
    globalBrowser = null;
  } catch (error) {
    console.error("[Cleanup Error]:", (error as Error).message);
  }
};

const delay = (ms: number): Promise<void> =>
  new Promise((resolve) => setTimeout(resolve, ms));
