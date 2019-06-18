import { VueConstructor } from 'vue';

interface CompsList {
  [key: string]: VueConstructor;
}

import SvgIcon from './Icon/SvgIcon.vue';
import LeafHtml from './LeafHtml.vue';
export const Comps: CompsList = {
  SvgIcon,
  LeafHtml
};
