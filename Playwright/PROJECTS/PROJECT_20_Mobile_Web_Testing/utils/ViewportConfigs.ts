import { Page } from '@playwright/test';

/**
 * ViewportConfigs - Viewport size configurations
 */
export interface ViewportSize {
  width: number;
  height: number;
  name: string;
  type: 'mobile' | 'tablet' | 'desktop';
}

export class ViewportConfigs {
  // Mobile viewports
  static readonly MOBILE_SMALL: ViewportSize = { width: 320, height: 568, name: 'Mobile Small', type: 'mobile' };
  static readonly MOBILE_MEDIUM: ViewportSize = { width: 375, height: 667, name: 'Mobile Medium', type: 'mobile' };
  static readonly MOBILE_LARGE: ViewportSize = { width: 414, height: 896, name: 'Mobile Large', type: 'mobile' };

  // Tablet viewports
  static readonly TABLET_SMALL: ViewportSize = { width: 768, height: 1024, name: 'Tablet Small', type: 'tablet' };
  static readonly TABLET_LARGE: ViewportSize = { width: 1024, height: 1366, name: 'Tablet Large', type: 'tablet' };

  // Desktop viewports
  static readonly DESKTOP_SMALL: ViewportSize = { width: 1280, height: 720, name: 'Desktop Small', type: 'desktop' };
  static readonly DESKTOP_MEDIUM: ViewportSize = { width: 1920, height: 1080, name: 'Desktop Medium', type: 'desktop' };
  static readonly DESKTOP_LARGE: ViewportSize = { width: 2560, height: 1440, name: 'Desktop Large', type: 'desktop' };

  /**
   * Apply viewport size to page
   * @param page - Playwright page
   * @param viewport - Viewport size configuration
   */
  static async applyViewport(page: Page, viewport: ViewportSize): Promise<void> {
    await page.setViewportSize({ width: viewport.width, height: viewport.height });
  }

  /**
   * Get all mobile viewports
   * @returns Array of mobile viewport sizes
   */
  static getMobileViewports(): ViewportSize[] {
    return [
      this.MOBILE_SMALL,
      this.MOBILE_MEDIUM,
      this.MOBILE_LARGE,
    ];
  }

  /**
   * Get all tablet viewports
   * @returns Array of tablet viewport sizes
   */
  static getTabletViewports(): ViewportSize[] {
    return [
      this.TABLET_SMALL,
      this.TABLET_LARGE,
    ];
  }

  /**
   * Get all desktop viewports
   * @returns Array of desktop viewport sizes
   */
  static getDesktopViewports(): ViewportSize[] {
    return [
      this.DESKTOP_SMALL,
      this.DESKTOP_MEDIUM,
      this.DESKTOP_LARGE,
    ];
  }

  /**
   * Get all viewports
   * @returns Array of all viewport sizes
   */
  static getAllViewports(): ViewportSize[] {
    return [
      ...this.getMobileViewports(),
      ...this.getTabletViewports(),
      ...this.getDesktopViewports(),
    ];
  }

  /**
   * Detect viewport type from size
   * @param width - Viewport width
   * @returns Viewport type
   */
  static detectViewportType(width: number): 'mobile' | 'tablet' | 'desktop' {
    if (width < 768) {
      return 'mobile';
    } else if (width < 1024) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }
}
