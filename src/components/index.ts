import { VueConstructor } from 'vue';

interface CompsList {
  [key: string]: VueConstructor;
}

import SvgIcon from './Icon/SvgIcon.vue';

export const Comps: CompsList = {
  SvgIcon
};
