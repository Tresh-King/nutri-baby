export interface AIAnalysisRequest {
    babyProfile: any;
    recentRecords: {
        feeding: any[];
        sleep: any[];
        growth: any[];
    };
    query?: string; // Optional user question
}

export interface AIAnalysisResponse {
    insight: string;
    recommendations: string[];
    sentiment: 'positive' | 'neutral' | 'concern';
}

export interface AIProvider {
    analyze(request: AIAnalysisRequest): Promise<AIAnalysisResponse>;
}
