/**
 * Page Object Pattern - Social Media Feed Page
 * Template for navigation and actions in feed
 */
import { Page, Locator } from '@playwright/test';
import { HumanBehavior } from '../utils/HumanBehavior';

export class FeedPage {
  readonly page: Page;
  readonly feedContainer: Locator;
  readonly postItems: Locator;
  readonly postAuthor: Locator;
  readonly postContent: Locator;
  readonly likeButton: Locator;
  readonly unlikeButton: Locator;
  readonly followButton: Locator;
  readonly unfollowButton: Locator;
  readonly postButton: Locator;
  readonly postTextarea: Locator;
  readonly submitPostButton: Locator;

  constructor(page: Page) {
    this.page = page;
    
    // Locators - adapted for demo-social-feed.html
    // For other platforms, adapt these locators
    this.feedContainer = page.locator('[data-testid="feed-container"]');
    this.postItems = page.locator('[data-testid="post-item"]');
    this.postAuthor = page.locator('.author-name');
    this.postContent = page.locator('.post-content');
    this.likeButton = page.locator('.like-btn');
    this.unlikeButton = page.locator('.like-btn.liked');
    this.followButton = page.locator('.follow-btn');
    this.unfollowButton = page.locator('.follow-btn.followed');
    this.postButton = page.locator("button[data-testid='create-post']");
    this.postTextarea = page.locator("textarea[placeholder*='post']");
    this.submitPostButton = page.locator("button[type='submit']");
  }

  /**
   * Wait for feed to load
   */
  async waitForPageLoad(): Promise<void> {
    try {
      await this.feedContainer.waitFor({ state: 'visible', timeout: 10000 });
      await HumanBehavior.randomDelay(1.0, 2.0);
    } catch (error) {
      throw new Error('Feed page did not load properly');
    }
  }

  /**
   * Check if feed is loaded
   */
  async isLoaded(): Promise<boolean> {
    try {
      return await this.feedContainer.isVisible({ timeout: 5000 });
    } catch {
      return false;
    }
  }

  /**
   * Get number of visible posts in feed
   * 
   * @returns Number of posts
   */
  async getPostsCount(): Promise<number> {
    try {
      return await this.postItems.count();
    } catch {
      return 0;
    }
  }

  /**
   * Get post element by index
   * 
   * @param index Post index (default: 0)
   * @returns Locator for the post
   */
  getPostByIndex(index: number = 0): Locator {
    return this.postItems.nth(index);
  }

  /**
   * Scroll in page to load more posts
   */
  async scrollToLoadMore(): Promise<void> {
    await HumanBehavior.humanScroll(this.page, 600, 'down');
    await HumanBehavior.randomDelay(2.0, 3.5); // Delay for lazy load
  }

  /**
   * Navigate through feed with multiple scrolls
   * 
   * @param scrollCount Number of scrolls to make
   */
  async navigateFeed(scrollCount: number = 3): Promise<void> {
    await this.waitForPageLoad();
    
    for (let i = 0; i < scrollCount; i++) {
      await this.scrollToLoadMore();
      
      // Simulate reading posts
      const postsCount = await this.getPostsCount();
      if (postsCount > 0) {
        // Simulate reading the last post
        await HumanBehavior.randomDelay(2.0, 4.0);
      }
    }
  }

  /**
   * Like a post
   * 
   * @param postIndex Index of post to like (default: 0)
   * @returns True if like succeeded
   */
  async likePost(postIndex: number = 0): Promise<boolean> {
    const postsCount = await this.getPostsCount();
    if (postIndex >= postsCount) {
      return false;
    }
    
    const post = this.getPostByIndex(postIndex);
    
    // Scroll to post to make it visible
    await post.scrollIntoViewIfNeeded();
    await HumanBehavior.randomDelay(0.5, 1.0);
    
    // Find like button in post context
    try {
      const likeButton = post.locator('.like-btn');
      
      // Check if already liked
      const isLiked = await likeButton.getAttribute('aria-label') === 'Unlike';
      if (isLiked) {
        console.log(`Post ${postIndex} is already liked`);
        return true;
      }
      
      await likeButton.click();
      await HumanBehavior.randomDelay(0.5, 1.0);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Unlike a post
   * 
   * @param postIndex Index of post to unlike (default: 0)
   * @returns True if unlike succeeded
   */
  async unlikePost(postIndex: number = 0): Promise<boolean> {
    const postsCount = await this.getPostsCount();
    if (postIndex >= postsCount) {
      return false;
    }
    
    const post = this.getPostByIndex(postIndex);
    
    await post.scrollIntoViewIfNeeded();
    await HumanBehavior.randomDelay(0.5, 1.0);
    
    try {
      const unlikeButton = post.locator('.like-btn.liked');
      await unlikeButton.click();
      await HumanBehavior.randomDelay(0.5, 1.0);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if a post is liked
   * 
   * @param postIndex Post index
   * @returns True if liked
   */
  async isPostLiked(postIndex: number = 0): Promise<boolean> {
    const postsCount = await this.getPostsCount();
    if (postIndex >= postsCount) {
      return false;
    }
    
    const post = this.getPostByIndex(postIndex);
    
    try {
      const likeButton = post.locator('.like-btn');
      const ariaLabel = await likeButton.getAttribute('aria-label');
      return ariaLabel === 'Unlike';
    } catch {
      return false;
    }
  }

  /**
   * Follow a user from a post
   * 
   * @param postIndex Index of post from which to follow (default: 0)
   * @returns True if follow succeeded
   */
  async followUser(postIndex: number = 0): Promise<boolean> {
    const postsCount = await this.getPostsCount();
    if (postIndex >= postsCount) {
      return false;
    }
    
    const post = this.getPostByIndex(postIndex);
    
    await post.scrollIntoViewIfNeeded();
    await HumanBehavior.randomDelay(0.5, 1.0);
    
    try {
      // Find follow button in post
      const followButton = post.locator('.follow-btn');
      
      // Check if already followed
      const isFollowed = await followButton.getAttribute('aria-label') === 'Unfollow';
      if (isFollowed) {
        console.log(`User from post ${postIndex} is already followed`);
        return true;
      }
      
      await followButton.click();
      await HumanBehavior.randomDelay(0.8, 1.5);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Unfollow a user
   * 
   * @param postIndex Post index (default: 0)
   * @returns True if unfollow succeeded
   */
  async unfollowUser(postIndex: number = 0): Promise<boolean> {
    const postsCount = await this.getPostsCount();
    if (postIndex >= postsCount) {
      return false;
    }
    
    const post = this.getPostByIndex(postIndex);
    
    await post.scrollIntoViewIfNeeded();
    await HumanBehavior.randomDelay(0.5, 1.0);
    
    try {
      const unfollowButton = post.locator('.follow-btn.followed');
      await unfollowButton.click();
      await HumanBehavior.randomDelay(0.8, 1.5);
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Check if user from a post is followed
   * 
   * @param postIndex Post index
   * @returns True if followed
   */
  async isUserFollowed(postIndex: number = 0): Promise<boolean> {
    const postsCount = await this.getPostsCount();
    if (postIndex >= postsCount) {
      return false;
    }
    
    const post = this.getPostByIndex(postIndex);
    
    try {
      const followButton = post.locator('.follow-btn');
      const ariaLabel = await followButton.getAttribute('aria-label');
      return ariaLabel === 'Unfollow';
    } catch {
      return false;
    }
  }

  /**
   * Create a new post (optional - may require special permissions)
   * 
   * @param content Post content
   * @returns True if posting succeeded
   * 
   * ⚠️ WARNING: This function is for demonstration.
   * Actual use on real platforms may violate Terms of Service.
   */
  async createPost(content: string): Promise<boolean> {
    try {
      // Click create post button
      await this.postButton.waitFor({ state: 'visible' });
      await HumanBehavior.humanClick(this.page, "button[data-testid='create-post']");
      await HumanBehavior.randomDelay(1.0, 2.0);
      
      // Type content
      await this.postTextarea.waitFor({ state: 'visible' });
      await HumanBehavior.humanType(this.page, "textarea[placeholder*='post']", content);
      await HumanBehavior.thinkDelay();
      
      // Submit
      await this.submitPostButton.waitFor({ state: 'visible' });
      await HumanBehavior.humanClick(this.page, "button[type='submit']");
      await HumanBehavior.randomDelay(1.5, 2.5);
      
      return true;
    } catch (error) {
      console.log(`Error creating post: ${error}`);
      return false;
    }
  }

  /**
   * Get post content
   * 
   * @param postIndex Post index
   * @returns Post content or null
   */
  async getPostContent(postIndex: number = 0): Promise<string | null> {
    const postsCount = await this.getPostsCount();
    if (postIndex >= postsCount) {
      return null;
    }
    
    const post = this.getPostByIndex(postIndex);
    
    try {
      const contentElement = post.locator('.post-content');
      return await contentElement.textContent();
    } catch {
      return null;
    }
  }
}

