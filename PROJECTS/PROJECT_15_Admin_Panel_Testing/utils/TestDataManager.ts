/**
 * Utilities for test data management
 * Setup and teardown for test data
 */

export interface TestUserData {
  first_name: string;
  last_name: string;
  employee_id: string;
  username: string;
  password: string;
  email: string;
  user_role: string;
  status: string;
}

export interface TestEmployeeData {
  first_name: string;
  last_name: string;
  employee_id: string;
  middle_name: string;
}

export class TestDataManager {
  /**
   * Generates a unique string for test data
   * 
   * @param prefix Prefix for string (default: "test")
   * @param length Length of random part (default: 8)
   * @returns Unique string
   */
  static generateUniqueString(prefix: string = 'test', length: number = 8): string {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomPart = '';
    for (let i = 0; i < length; i++) {
      randomPart += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    const timestamp = new Date().toISOString().replace(/[-:T.]/g, '').slice(0, 14);
    return `${prefix}_${randomPart}_${timestamp}`;
  }

  /**
   * Generates test data for a new user
   * 
   * @returns Test user data
   */
  static generateTestUserData(): TestUserData {
    const uniqueId = TestDataManager.generateUniqueString('user', 6);
    
    return {
      first_name: `TestUser${uniqueId}`,
      last_name: `TestLastName${uniqueId}`,
      employee_id: `EMP${uniqueId}`,
      username: `testuser${uniqueId}`,
      password: 'TestPassword123!',
      email: `test${uniqueId}@example.com`,
      user_role: 'ESS', // Default role
      status: 'Enabled'
    };
  }

  /**
   * Generates test data for a new employee
   * 
   * @returns Test employee data
   */
  static generateTestEmployeeData(): TestEmployeeData {
    const uniqueId = TestDataManager.generateUniqueString('emp', 6);
    
    return {
      first_name: `Employee${uniqueId}`,
      last_name: `LastName${uniqueId}`,
      employee_id: `EMP${uniqueId}`,
      middle_name: `Middle${uniqueId}`
    };
  }

  /**
   * Cleanup for created test data
   * 
   * @param createdItems List of IDs or identifiers to delete
   * @param cleanupFunc Function that deletes an item (receives ID)
   * @returns Number of deleted items
   */
  static cleanupTestData<T>(
    createdItems: T[],
    cleanupFunc: (item: T) => Promise<boolean> | boolean
  ): number {
    let cleanedCount = 0;
    
    for (const item of createdItems) {
      try {
        if (cleanupFunc(item)) {
          cleanedCount++;
          console.log(`Cleaned up item: ${item}`);
        }
      } catch (error) {
        console.error(`Error cleaning up item ${item}: ${error}`);
      }
    }
    
    return cleanedCount;
  }

  /**
   * Generates a random email
   * 
   * @param domain Email domain (default: "example.com")
   * @returns Generated email
   */
  static generateRandomEmail(domain: string = 'example.com'): string {
    const uniqueId = TestDataManager.generateUniqueString('user', 6);
    return `test${uniqueId}@${domain}`;
  }

  /**
   * Generates a random phone number
   * 
   * @returns Generated phone number
   */
  static generateRandomPhone(): string {
    const randomNum = Math.floor(Math.random() * (9999999999 - 2000000000 + 1)) + 2000000000;
    return `+1${randomNum}`;
  }

  /**
   * Generates a batch of test data
   * 
   * @param count Number of items to generate (default: 5)
   * @returns List of test data
   */
  static generateTestDataBatch(count: number = 5): TestUserData[] {
    const testDataList: TestUserData[] = [];
    for (let i = 0; i < count; i++) {
      testDataList.push(TestDataManager.generateTestUserData());
    }
    return testDataList;
  }
}

