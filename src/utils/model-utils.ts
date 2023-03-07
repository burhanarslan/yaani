export function modelDataMatcher<T>(data: Partial<T>, context: T): void {
  for (const [key, value] of Object.entries(data)) {
    if (context.hasOwnProperty(key)) {
      (<any>context)[key] = value;
    }
  }
}

