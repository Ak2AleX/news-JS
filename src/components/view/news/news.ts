import './news.css';
import { Article, ArticleMeta, Drawable } from '../../../types';
import { getElement } from '../../../utils/dom';

class News implements Drawable<Article> {
    public draw(data: Article[]): void {
        const news = data.slice(0, 10);

        const fragment = document.createDocumentFragment();
        const newsItemTemp = getElement<HTMLTemplateElement>('#newsItemTemp');

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as DocumentFragment;

            if (idx % 2) getElement<HTMLElement>('.news__item', newsClone).classList.add('alt');

            getElement<HTMLElement>('.news__meta-photo', newsClone).style.backgroundImage = `url(${
                item.urlToImage || 'img/news_placeholder.svg'
            })`;
            const { author, date } = this.formatMeta(item);
            getElement<HTMLElement>('.news__meta-author', newsClone).textContent = author;
            getElement<HTMLElement>('.news__meta-date', newsClone).textContent = date;

            getElement<HTMLElement>('.news__description-title', newsClone).textContent = item.title;
            getElement<HTMLElement>('.news__description-source', newsClone).textContent = item.source.name;
            getElement<HTMLElement>('.news__description-content', newsClone).textContent = item.description;
            getElement<HTMLAnchorElement>('.news__read-more a', newsClone).setAttribute('href', item.url);

            fragment.append(newsClone);
        });

        const container = getElement<HTMLElement>('.news');
        container.innerHTML = '';
        container.appendChild(fragment);
    }

    private formatMeta({ author, source, publishedAt }: ArticleMeta): { author: string; date: string } {
        return {
            author: author || source.name,
            date: publishedAt.slice(0, 10).split('-').reverse().join('-'),
        };
    }
}

export default News;
