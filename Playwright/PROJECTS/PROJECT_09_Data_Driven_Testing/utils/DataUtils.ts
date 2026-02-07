import * as fs from 'fs';
import * as path from 'path';

/**
 * Data Utilities for reading test data from CSV, JSON files
 * Functions for loading data, conversion, validation
 */
export interface TestData {
  [key: string]: string | number | boolean;
}

export class DataUtils {
  /**
   * Read data from a CSV file
   * 
   * @param filePath - Path to the CSV file
   * @returns List of dictionaries with data (one dictionary per row)
   */
  static readCsv(filePath: string): TestData[] {
    const data: TestData[] = [];
    
    if (!fs.existsSync(filePath)) {
      throw new Error(`CSV file not found: ${filePath}`);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const lines = fileContent.split('\n').filter(line => line.trim());
    
    if (lines.length === 0) {
      return data;
    }
    
    // Parse header
    const headers = lines[0].split(',').map(h => h.trim());
    
    // Parse data rows
    for (let i = 1; i < lines.length; i++) {
      const values = lines[i].split(',').map(v => v.trim());
      if (values.length === headers.length && values.some(v => v.length > 0)) {
        const row: TestData = {};
        for (let j = 0; j < headers.length; j++) {
          row[headers[j]] = values[j] || '';
        }
        data.push(row);
      }
    }
    
    return data;
  }

  /**
   * Read data from a JSON file
   * 
   * @param filePath - Path to the JSON file
   * @returns List of dictionaries with data
   */
  static readJson(filePath: string): TestData[] {
    if (!fs.existsSync(filePath)) {
      throw new Error(`JSON file not found: ${filePath}`);
    }
    
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    
    // If JSON is a simple dictionary, convert it to array
    if (Array.isArray(data)) {
      return data;
    } else if (typeof data === 'object') {
      return [data];
    }
    
    return [];
  }

  /**
   * Filter test data by criteria
   * 
   * @param data - List of test data
   * @param filters - Object with key-value pairs to filter by
   * @returns Filtered list of test data
   */
  static filterTestData(data: TestData[], filters: Partial<TestData>): TestData[] {
    return data.filter(item => {
      for (const key in filters) {
        if (item[key] !== filters[key]) {
          return false;
        }
      }
      return true;
    });
  }

  /**
   * Validate test data contains required fields
   * 
   * @param data - List of test data
   * @param requiredFields - List of required field names
   * @returns True if all data has required fields
   */
  static validateTestData(data: TestData[], requiredFields: string[]): boolean {
    if (data.length === 0) {
      return false;
    }
    
    for (const item of data) {
      for (const field of requiredFields) {
        if (!(field in item)) {
          return false;
        }
      }
    }
    
    return true;
  }

  /**
   * Find test data by key-value pair
   * 
   * @param data - List of test data
   * @param key - Key to search for
   * @param value - Value to match
   * @returns First matching test data or null
   */
  static getTestDataByKey(data: TestData[], key: string, value: string | number): TestData | null {
    for (const item of data) {
      if (item[key] === value) {
        return item;
      }
    }
    return null;
  }

  /**
   * Convert test data to Playwright test.each format
   * 
   * @param data - List of test data
   * @returns Array of tuples for test.each
   */
  static convertToTestEach(data: TestData[]): TestData[] {
    return data;
  }
}

