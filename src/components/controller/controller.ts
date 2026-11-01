import AppLoader from './appLoader';
import { Callback, Endpoint, NewsResponse, SourcesResponse } from '../../types';

class AppController extends AppLoader {
    public getSources(callback: Callback<SourcesResponse>): void {
        super.getResp<SourcesResponse>({ endpoint: Endpoint.Sources }, callback);
    }

    public getNews(e: MouseEvent, callback: Callback<NewsResponse>): void {
        let target: HTMLElement | null = e.target instanceof HTMLElement ? e.target : null;
        const newsContainer = e.currentTarget instanceof HTMLElement ? e.currentTarget : null;

        if (!target || !newsContainer) return;

        while (target !== newsContainer) {
            if (target.classList.contains('source__item')) {
                const sourceId = target.getAttribute('data-source-id');
                if (sourceId && newsContainer.getAttribute('data-source') !== sourceId) {
                    newsContainer.setAttribute('data-source', sourceId);
                    super.getResp<NewsResponse>(
                        {
                            endpoint: Endpoint.Everything,
                            options: { sources: sourceId },
                        },
                        callback
                    );
                }
                return;
            }
            target = target.parentElement;
            if (!target) return;
        }
    }
}

export default AppController;
