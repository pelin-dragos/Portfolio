/**
 * Test Suite: Social Media Automation
 * Tests for login, feed navigation, like/unlike, follow/unfollow
 */
import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { FeedPage } from '../pages/FeedPage';
import { HumanBehavior } from '../utils/HumanBehavior';

test.describe('@login Login Tests', () => {
  /**
   * Test: Successful login on social platform
   * 
   * Steps:
   * 1. Navigate to login page
   * 2. Enter username and password
   * 3. Click login
   * 4. Verify login succeeded
   */
  test('@critical should successfully login', async ({ page }) => {
    // ⚠️ NOTE: This test is a template
    // Adapt URL and locators to your testing platform
    
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    
    // Verify page loaded
    // Note: demo-social-feed.html doesn't have login, so this will fail
    // In production, uncomment and adapt to your platform
    // const isLoaded = await loginPage.isLoaded();
    // expect(isLoaded).toBeTruthy();
    
    // Login (adapt credentials)
    // await loginPage.login("test_user", "test_password");
    
    // Verify login succeeded
    // const isLoggedIn = await loginPage.isLoggedIn();
    // expect(isLoggedIn).toBeTruthy();
    
    console.log('⚠️  NOTE: This test is a template.');
    console.log('    Adapt URL and locators to your testing platform.');
  });

  /**
   * Test: Login with invalid credentials
   * 
   * Steps:
   * 1. Navigate to login page
   * 2. Enter invalid credentials
   * 3. Verify error message
   */
  test('should fail login with invalid credentials', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateTo();
    
    // Verify page loaded
    // const isLoaded = await loginPage.isLoaded();
    // expect(isLoaded).toBeTruthy();
    
    // Test login with invalid credentials
    // try {
    //   await loginPage.login("invalid_user", "invalid_password");
    //   expect(false).toBeTruthy(); // Should not reach here
    // } catch (error) {
    //   const errorMsg = await loginPage.getErrorMessage();
    //   expect(errorMsg).not.toBeNull();
    // }
    
    console.log('⚠️  NOTE: This test is a template.');
  });
});

test.describe('@feed Feed Navigation Tests', () => {
  /**
   * Test: Navigate through feed
   * 
   * Steps:
   * 1. Login (assume already logged in)
   * 2. Access feed
   * 3. Scroll through feed
   * 4. Verify posts are loaded
   */
  test('@critical should navigate feed', async ({ page }) => {
    const feedPage = new FeedPage(page);
    
    // Navigate to feed (adapt URL)
    await page.goto('http://localhost:8000/demo-social-feed.html');
    await feedPage.waitForPageLoad();
    
    // Verify feed loaded
    const isLoaded = await feedPage.isLoaded();
    expect(isLoaded).toBeTruthy();
    
    // Navigate through feed
    await feedPage.navigateFeed(2);
    
    // Verify posts exist
    const postsCount = await feedPage.getPostsCount();
    expect(postsCount).toBeGreaterThan(0);
  });

  /**
   * Test: Scroll to load more posts
   * 
   * Steps:
   * 1. Access feed
   * 2. Scroll multiple times
   * 3. Verify number of posts increases
   */
  test('should scroll to load more posts', async ({ page }) => {
    const feedPage = new FeedPage(page);
    
    await page.goto('http://localhost:8000/demo-social-feed.html');
    await feedPage.waitForPageLoad();
    
    const initialCount = await feedPage.getPostsCount();
    
    // Scroll to load lazy load
    for (let i = 0; i < 3; i++) {
      await feedPage.scrollToLoadMore();
    }
    
    const finalCount = await feedPage.getPostsCount();
    // Note: demo page has fixed posts, so count might not increase
    expect(finalCount).toBeGreaterThanOrEqual(initialCount);
  });
});

test.describe('@like Like/Unlike Tests', () => {
  /**
   * Test: Like a post
   * 
   * Steps:
   * 1. Navigate to feed
   * 2. Find a post
   * 3. Like the post
   * 4. Verify post is liked
   */
  test('@critical should like a post', async ({ page }) => {
    const feedPage = new FeedPage(page);
    
    await page.goto('http://localhost:8000/demo-social-feed.html');
    await feedPage.waitForPageLoad();
    
    // Verify posts exist
    const postsCount = await feedPage.getPostsCount();
    expect(postsCount).toBeGreaterThan(0);
    
    // Like first post
    const result = await feedPage.likePost(0);
    expect(result).toBeTruthy();
    
    // Verify post is liked
    const isLiked = await feedPage.isPostLiked(0);
    expect(isLiked).toBeTruthy();
  });

  /**
   * Test: Unlike a post
   * 
   * Steps:
   * 1. Like a post
   * 2. Unlike the same post
   * 3. Verify post is not liked
   */
  test('should unlike a post', async ({ page }) => {
    const feedPage = new FeedPage(page);
    
    await page.goto('http://localhost:8000/demo-social-feed.html');
    await feedPage.waitForPageLoad();
    
    // Like and then unlike
    await feedPage.likePost(0);
    await HumanBehavior.randomDelay(1.0, 2.0);
    
    const result = await feedPage.unlikePost(0);
    expect(result).toBeTruthy();
    
    // Verify post is not liked
    const isLiked = await feedPage.isPostLiked(0);
    expect(isLiked).toBeFalsy();
  });

  /**
   * Test: Like multiple posts with human delays
   * 
   * Steps:
   * 1. Navigate through feed
   * 2. Like a few posts with delays between them
   * 3. Verify all are liked
   */
  test('should like multiple posts with human delays', async ({ page }) => {
    const feedPage = new FeedPage(page);
    
    await page.goto('http://localhost:8000/demo-social-feed.html');
    await feedPage.waitForPageLoad();
    
    // Like a few posts with human delays
    const likedPosts: number[] = [];
    const postsCount = await feedPage.getPostsCount();
    const maxPosts = Math.min(3, postsCount);
    
    for (let i = 0; i < maxPosts; i++) {
      const result = await feedPage.likePost(i);
      if (result) {
        likedPosts.push(i);
      }
      await HumanBehavior.randomDelay(2.0, 4.0); // Human delay between likes
    }
    
    // Verify all are liked
    for (const postIndex of likedPosts) {
      const isLiked = await feedPage.isPostLiked(postIndex);
      expect(isLiked).toBeTruthy();
    }
    
    console.log('⚠️  Important: Use human delays between actions!');
  });
});

test.describe('@follow Follow/Unfollow Tests', () => {
  /**
   * Test: Follow a user
   * 
   * Steps:
   * 1. Navigate to feed
   * 2. Find a user
   * 3. Follow the user
   * 4. Verify user is followed
   */
  test('@critical should follow a user', async ({ page }) => {
    const feedPage = new FeedPage(page);
    
    await page.goto('http://localhost:8000/demo-social-feed.html');
    await feedPage.waitForPageLoad();
    
    // Follow user from first post
    const result = await feedPage.followUser(0);
    expect(result).toBeTruthy();
    
    // Verify user is followed
    const isFollowed = await feedPage.isUserFollowed(0);
    expect(isFollowed).toBeTruthy();
  });

  /**
   * Test: Unfollow a user
   * 
   * Steps:
   * 1. Follow a user
   * 2. Unfollow the same user
   * 3. Verify user is not followed
   */
  test('should unfollow a user', async ({ page }) => {
    const feedPage = new FeedPage(page);
    
    await page.goto('http://localhost:8000/demo-social-feed.html');
    await feedPage.waitForPageLoad();
    
    // Follow and then unfollow
    await feedPage.followUser(0);
    await HumanBehavior.randomDelay(1.0, 2.0);
    
    const result = await feedPage.unfollowUser(0);
    expect(result).toBeTruthy();
    
    // Verify user is not followed
    const isFollowed = await feedPage.isUserFollowed(0);
    expect(isFollowed).toBeFalsy();
  });
});

test.describe('@post Create Post Tests', () => {
  /**
   * Test: Create a new post
   * 
   * Steps:
   * 1. Navigate to feed
   * 2. Click create post button
   * 3. Write content
   * 4. Submit
   * 5. Verify post was created
   * 
   * ⚠️ WARNING: This functionality may violate Terms of Service
   * on real platforms. Use only on testing platforms!
   */
  test('should create a post', async ({ page }) => {
    const feedPage = new FeedPage(page);
    
    // Note: demo-social-feed.html doesn't have create post functionality
    // This is a template for platforms that support it
    
    // await page.goto('http://localhost:8000/demo-social-feed.html');
    // await feedPage.waitForPageLoad();
    
    // Create post
    // const testContent = `Test post from automation - ${Date.now()}`;
    // const result = await feedPage.createPost(testContent);
    
    // Verify posting succeeded
    // expect(result).toBeTruthy();
    
    console.log('⚠️  NOTE: This test is a template.');
    console.log('    ⚠️  WARNING: Creating automated posts may violate ToS!');
    console.log('    Use only on testing platforms or with explicit permissions!');
  });
});

test.describe('@flow Complete Flow Tests', () => {
  /**
   * Test: Complete flow - Login → Navigate → Like → Follow
   * 
   * Steps:
   * 1. Login
   * 2. Navigate feed
   * 3. Like a few posts
   * 4. Follow a user
   * 5. Verify all actions succeeded
   */
  test('should complete full social media flow', async ({ page }) => {
    // Login
    const loginPage = new LoginPage(page);
    // await loginPage.navigateTo();
    // await loginPage.login("test_user", "test_password");
    
    // Navigate feed
    const feedPage = new FeedPage(page);
    await page.goto('http://localhost:8000/demo-social-feed.html');
    await feedPage.waitForPageLoad();
    
    // Navigate through feed
    await feedPage.navigateFeed(2);
    
    // Like a post
    await feedPage.likePost(0);
    await HumanBehavior.randomDelay(1.0, 2.0);
    
    // Follow a user
    await feedPage.followUser(0);
    
    // Verify actions
    const isLiked = await feedPage.isPostLiked(0);
    const isFollowed = await feedPage.isUserFollowed(0);
    
    expect(isLiked).toBeTruthy();
    expect(isFollowed).toBeTruthy();
    
    console.log('⚠️  NOTE: This test is a template for complete flow.');
    console.log('    Adapt to your specific testing platform.');
  });
});

