import './sources.css';
import { Drawable, SourceInfo } from '../../../types';
import { getElement } from '../../../utils/dom';

class Sources implements Drawable<SourceInfo> {
    public draw(data: SourceInfo[]): void {
        const fragment = document.createDocumentFragment();
        const sourceItemTemp = getElement<HTMLTemplateElement>('#sourceItemTemp');

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as DocumentFragment;

            getElement<HTMLElement>('.source__item-name', sourceClone).textContent = item.name;
            getElement<HTMLElement>('.source__item', sourceClone).setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        getElement<HTMLElement>('.sources').append(fragment);
    }
}

export default Sources;
