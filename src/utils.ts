
/**
 * Process items in batches with a concurrency limit
 */
export async function processBatch<T, R>(
    items: T[],
    processItem: (item: T) => Promise<R>,
    concurrencyLimit: number
): Promise<R[]> {
    const results: R[] = [];
    const chunks = [];

    // Split items into chunks based on concurrency limit
    for (let i = 0; i < items.length; i += concurrencyLimit) {
        chunks.push(items.slice(i, i + concurrencyLimit));
    }

    // Process each chunk concurrently
    for (const chunk of chunks) {
        const chunkResults = await Promise.all(chunk.map(processItem));
        results.push(...chunkResults);
    }

    return results;
}