import { AIProvider } from './types';
import { GeminiProvider } from './providers/gemini';

export type ProviderType = 'gemini' | 'openai' | 'doubao';

export class AIFactory {
    static createProvider(type: ProviderType = 'gemini'): AIProvider {
        const apiKey = process.env.AI_API_KEY || 'mock-key';

        switch (type) {
            case 'gemini':
                return new GeminiProvider(apiKey);
            // case 'openai':
            //     return new OpenAIProvider(apiKey);
            default:
                return new GeminiProvider(apiKey);
        }
    }
}
