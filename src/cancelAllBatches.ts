import Anthropic from '@anthropic-ai/sdk'
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const client = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY,
    defaultHeaders: {
        'anthropic-beta': 'output-128k-2025-02-19',
    }
})

const batches = await client.beta.messages.batches.list()
await Promise.all(batches.data.map(async (batch) => {
    if (batch.processing_status !== 'in_progress') {
        return
    }

    console.log(`Cancelling batch ${batch.id}`)
    await client.beta.messages.batches.cancel(batch.id).then(() => {
        console.log(`Batch ${batch.id} cancelled`)
    }).catch((error) => {
        console.error(`Error cancelling batch ${batch.id}: ${error}`)
    })
}))