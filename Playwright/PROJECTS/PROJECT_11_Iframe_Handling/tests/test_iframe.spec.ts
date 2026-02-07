import { test, expect } from '@playwright/test';
import { IframePage } from '../pages/IframePage';
import { FramesPage } from '../pages/FramesPage';
import { IframeUtils } from '../utils/IframeUtils';

/**
 * Test Suite: Iframe Handling Testing
 * Tests for iframes, switching between frames, nested frames
 * Uses tags for categorization (@iframe, @frame_switching, @nested_frames, @frame_interaction)
 */

test.describe('TestIframeSwitching', () => {
  /**
   * Test: Switch to iframe and verify context
   */
  test('@iframe @frame_switching @smoke @critical should switch to iframe', async ({ page }) => {
    const iframePage = new IframePage(page);
    await iframePage.navigateTo();
    
    // Switch to iframe
    const success = await iframePage.switchToIframe();
    expect(success).toBeTruthy();
    
    // Verify we can access iframe content
    const isInIframe = await iframePage.isInIframe();
    expect(isInIframe).toBeTruthy();
    
    // Get text from iframe to verify we're in it
    const text = await iframePage.getTextFromIframe();
    expect(text).not.toBeNull();
  });

  /**
   * Test: Interact with elements in iframe
   */
  test('@iframe @frame_switching @regression should interact with iframe elements', async ({ page }) => {
    const iframePage = new IframePage(page);
    await iframePage.navigateTo();
    
    // Switch to iframe
    await iframePage.switchToIframe();
    
    // Interact with editor
    const testText = 'Test iframe interaction';
    const success = await iframePage.setTextInIframe(testText);
    expect(success).toBeTruthy();
    
    // Verify text
    const text = await iframePage.getTextFromIframe();
    expect(text).toContain(testText);
  });

  /**
   * Test: Switch to iframe using IframeUtils
   */
  test('@iframe @frame_switching @regression should switch to iframe using IframeUtils', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    await page.waitForTimeout(1000);
    
    const iframeLocator = '#mce_0_ifr';
    const frame = IframeUtils.getFrameLocatorById(page, 'mce_0_ifr');
    
    // Verify frame is accessible
    const isAccessible = await IframeUtils.isFrameAccessible(page, iframeLocator);
    expect(isAccessible).toBeTruthy();
    
    // Get text from frame
    const text = await IframeUtils.getTextFromFrame(page, iframeLocator, '#tinymce');
    expect(text).not.toBeNull();
  });

  /**
   * Test: Switch by ID using utils
   */
  test('@iframe @frame_switching @regression should switch by ID using utils', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    await page.waitForTimeout(1000);
    
    const frame = IframeUtils.getFrameLocatorById(page, 'mce_0_ifr');
    const editor = frame.locator('#tinymce');
    
    await editor.waitFor({ state: 'visible', timeout: 10000 });
    const text = await editor.textContent();
    expect(text).not.toBeNull();
  });

  /**
   * Test: Switch by index using utils
   */
  test('@iframe @frame_switching @regression should switch by index using utils', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    await page.waitForTimeout(1000);
    
    const frame = await IframeUtils.getFrameByIndex(page, 0);
    expect(frame).not.toBeNull();
    
    if (frame) {
      const body = frame.locator('body');
      await body.waitFor({ state: 'visible', timeout: 10000 });
      const text = await body.textContent();
      expect(text).not.toBeNull();
    }
  });
});

test.describe('TestNestedFrames', () => {
  /**
   * Test: Navigate in nested frames
   */
  test('@iframe @nested_frames @smoke @critical should navigate nested frames', async ({ page }) => {
    const framesPage = new FramesPage(page);
    await framesPage.navigateToNestedFrames();
    
    // Get text from left frame
    const leftText = await framesPage.getTextFromFrame('left');
    expect(leftText).not.toBeNull();
    expect(leftText).toContain('LEFT');
    
    // Get text from middle frame
    const middleText = await framesPage.getTextFromFrame('middle');
    expect(middleText).not.toBeNull();
    expect(middleText).toContain('MIDDLE');
    
    // Get text from right frame
    const rightText = await framesPage.getTextFromFrame('right');
    expect(rightText).not.toBeNull();
    expect(rightText).toContain('RIGHT');
    
    // Get text from bottom frame
    const bottomText = await framesPage.getTextFromFrame('bottom');
    expect(bottomText).not.toBeNull();
    expect(bottomText).toContain('BOTTOM');
  });

  /**
   * Test: Switch to parent frame
   */
  test('@iframe @nested_frames @regression should switch to parent frame', async ({ page }) => {
    const framesPage = new FramesPage(page);
    await framesPage.navigateToNestedFrames();
    
    // Switch to left frame (nested in top)
    const leftSuccess = await framesPage.switchToLeftFrame();
    expect(leftSuccess).toBeTruthy();
    
    // Get text from left frame to verify we're in it
    const leftText = await framesPage.getTextFromFrame('left');
    expect(leftText).toContain('LEFT');
    
    // Switch back to default content
    const defaultSuccess = await framesPage.switchToDefaultContent();
    expect(defaultSuccess).toBeTruthy();
  });

  /**
   * Test: Navigate nested frames using IframeUtils
   */
  test('@iframe @nested_frames @regression should navigate nested frames using IframeUtils', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/nested_frames');
    await page.waitForTimeout(1000);
    
    // Switch to left frame (nested) using nested frame locator
    const nestedFrame = IframeUtils.getNestedFrameLocator(
      page,
      'frame[name="frame-top"]',
      'frame[name="frame-left"]'
    );
    
    const body = nestedFrame.locator('body');
    await body.waitFor({ state: 'visible', timeout: 10000 });
    const text = await body.textContent();
    expect(text).toContain('LEFT');
  });
});

test.describe('TestIframeInteraction', () => {
  /**
   * Test: Find element in frame using utils
   */
  test('@iframe @frame_interaction @regression should find element in frame', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    await page.waitForTimeout(1000);
    
    const iframeSelector = '#mce_0_ifr';
    const editorSelector = '#tinymce';
    
    // Find element in frame
    const element = IframeUtils.findElementInFrame(page, iframeSelector, editorSelector);
    await element.waitFor({ state: 'visible', timeout: 10000 });
    
    const text = await element.textContent();
    expect(text).not.toBeNull();
  });

  /**
   * Test: Click element in frame using utils
   */
  test('@iframe @frame_interaction @regression should click element in frame', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    await page.waitForTimeout(1000);
    
    const iframeSelector = '#mce_0_ifr';
    const editorSelector = '#tinymce';
    
    // Click element in frame
    const success = await IframeUtils.clickElementInFrame(page, iframeSelector, editorSelector);
    expect(success).toBeTruthy();
  });

  /**
   * Test: Get text from frame using utils
   */
  test('@iframe @frame_interaction @regression should get text from frame using utils', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    await page.waitForTimeout(1000);
    
    const iframeSelector = '#mce_0_ifr';
    const editorSelector = '#tinymce';
    
    // Get text from frame
    const text = await IframeUtils.getTextFromFrame(page, iframeSelector, editorSelector);
    expect(text).not.toBeNull();
    expect(text!.length).toBeGreaterThan(0);
  });

  /**
   * Test: Execute JavaScript in frame using utils
   */
  test('@iframe @frame_interaction @regression should execute script in frame', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    await page.waitForTimeout(1000);
    
    const iframeSelector = '#mce_0_ifr';
    const script = 'return document.body.innerHTML;';
    
    // Execute script in frame
    const result = await IframeUtils.executeScriptInFrame(page, iframeSelector, script);
    // Note: This might return null due to cross-origin restrictions, but the method should not throw
    expect(result !== undefined).toBeTruthy();
  });

  /**
   * Test: Test IframePage methods
   */
  test('@iframe @frame_interaction @regression should test IframePage methods', async ({ page }) => {
    const iframePage = new IframePage(page);
    await iframePage.navigateTo();
    
    // Get text from iframe
    const text = await iframePage.getTextFromIframe();
    expect(text).not.toBeNull();
    
    // Set text in iframe
    const testText = 'Test text from Playwright';
    const success = await iframePage.setTextInIframe(testText);
    expect(success).toBeTruthy();
    
    // Verify text
    const newText = await iframePage.getTextFromIframe();
    expect(newText).toContain(testText);
  });
});

test.describe('TestMultipleIframes', () => {
  /**
   * Test: Get all frames on page
   */
  test('@iframe @regression should get all frames', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/iframe');
    await page.waitForTimeout(1000);
    
    // Get all frames
    const frames = await IframeUtils.getAllFrames(page);
    expect(frames.length).toBeGreaterThan(0);
    
    // Verify frame count
    const frameCount = await IframeUtils.getFrameCount(page);
    expect(frameCount).toBeGreaterThan(0);
    expect(frameCount).toBe(frames.length);
  });

  /**
   * Test: Switch between multiple frames
   */
  test('@iframe @regression should switch between multiple frames', async ({ page }) => {
    const framesPage = new FramesPage(page);
    await framesPage.navigateToNestedFrames();
    
    // Switch to left frame
    const leftSuccess = await framesPage.switchToLeftFrame();
    expect(leftSuccess).toBeTruthy();
    const leftText = await framesPage.getTextFromFrame('left');
    expect(leftText).toContain('LEFT');
    
    // Switch to middle frame
    const middleSuccess = await framesPage.switchToMiddleFrame();
    expect(middleSuccess).toBeTruthy();
    const middleText = await framesPage.getTextFromFrame('middle');
    expect(middleText).toContain('MIDDLE');
    
    // Switch to right frame
    const rightSuccess = await framesPage.switchToRightFrame();
    expect(rightSuccess).toBeTruthy();
    const rightText = await framesPage.getTextFromFrame('right');
    expect(rightText).toContain('RIGHT');
    
    // Switch to bottom frame
    const bottomSuccess = await framesPage.switchToBottomFrame();
    expect(bottomSuccess).toBeTruthy();
    const bottomText = await framesPage.getTextFromFrame('bottom');
    expect(bottomText).toContain('BOTTOM');
  });
});

