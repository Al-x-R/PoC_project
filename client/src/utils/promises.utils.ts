export function waitAsync(ms: number): Promise<void> {
  return new Promise((res) => setTimeout(res, ms));
}
