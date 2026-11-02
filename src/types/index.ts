export enum Endpoint {
    Sources = 'sources',
    Everything = 'everything',
}

export enum HttpMethod {
    Get = 'GET',
}

export enum HttpStatus {
    Unauthorized = 401,
    NotFound = 404,
}

export type ResponseStatus = 'ok' | 'error';

export interface SourceInfo {
    id: string;
    name: string;
    description: string;
    url: string;
    category: string;
    language: string;
    country: string;
}

export interface ArticleSource {
    id: string | null;
    name: string;
}

export interface Article {
    source: ArticleSource;
    author: string | null;
    title: string;
    description: string | null;
    url: string;
    urlToImage: string | null;
    publishedAt: string;
    content: string | null;
}

export interface SourcesResponse {
    status: ResponseStatus;
    sources: SourceInfo[];
}

export interface NewsResponse {
    status: ResponseStatus;
    totalResults: number;
    articles: Article[];
}

export interface ApiOptions {
    apiKey: string;
    sources: string;
}

export interface RequestParams {
    endpoint: Endpoint;
    options?: Partial<ApiOptions>;
}

export type Callback<T> = (data: T) => void;

export interface Drawable<T> {
    draw(data: T[]): void;
}

export type ArticleMeta = Pick<Article, 'author' | 'source' | 'publishedAt'>;
