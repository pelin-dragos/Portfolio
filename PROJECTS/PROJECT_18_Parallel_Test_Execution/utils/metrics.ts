export class Metrics {
  private static startTime: number = 0;
  private static endTime: number = 0;

  static start(): void {
    this.startTime = Date.now();
  }

  static end(): number {
    this.endTime = Date.now();
    return this.getDuration();
  }

  static getDuration(): number {
    return this.endTime - this.startTime;
  }

  static formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    }
    return `${seconds}s`;
  }

  static calculateSpeedup(serialTime: number, parallelTime: number): number {
    if (parallelTime === 0) return 0;
    return serialTime / parallelTime;
  }

  static logComparison(serialTime: number, parallelTime: number, workers: number): void {
    const speedup = this.calculateSpeedup(serialTime, parallelTime);
    const timeSaved = serialTime - parallelTime;
    
    console.log('\n📊 Performance Comparison:');
    console.log(`   Serial execution:   ${this.formatDuration(serialTime)}`);
    console.log(`   Parallel execution: ${this.formatDuration(parallelTime)} (${workers} workers)`);
    console.log(`   Speedup:           ${speedup.toFixed(2)}x`);
    console.log(`   Time saved:        ${this.formatDuration(timeSaved)}\n`);
  }
}

