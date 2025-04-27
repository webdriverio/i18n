type BatchItem = () => Promise<void>

/**
 * Allows to process a function in batches.
 * This is needed because Anthropic's API has a limit of 50 requests per minute.
 */
export class Processor {
    #maxBatchSize: number
    #processing: number = 0
    #queue: BatchItem[] = []
    #isResolved: boolean = false
    #resolvers: { resolve: () => void, reject: (err: Error) => void, promise: Promise<void> }

    constructor(maxBatchSize: number) {
        this.#maxBatchSize = maxBatchSize
        this.#resolvers = Promise.withResolvers<void>()
    }

    process(func: () => Promise<void>): void {
        if (this.#isResolved) {
            throw new Error('Processor is already resolved')
        }

        if (this.#processing >= this.#maxBatchSize) {
            this.#queue.push(func)
            return
        }

        this.#processItem(func)
    }

    waitForResolved(): Promise<void> {
        return this.#resolvers.promise
    }

    #processItem(item: BatchItem): void {
        this.#processing++
        item().finally(() => this.#processQueue())
    }

    #processQueue(): void {
        this.#processing--
        if (this.#queue.length > 0) {
            this.#processItem(this.#queue.shift())
            console.log(`Processing queue: ${this.#queue.length} items left, ${this.#processing} processing`)
            return
        }
        this.#isResolved = true
        this.#resolvers.resolve()
    }
}
