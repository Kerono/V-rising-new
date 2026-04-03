const clearDuplicates = <T>(arr: T[]): T[] => [...new Set([...arr])];

export { clearDuplicates };
