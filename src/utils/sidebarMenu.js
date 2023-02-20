import {
  faList,
  faPlus,
  faTableCellsLarge,
} from '@fortawesome/free-solid-svg-icons';
import routes from './routes';

const sidebarMenu = [
  {
    to: routes.CREATE,
    label: 'Create',
    icon: faPlus,
  },
  {
    to: routes.ALL,
    label: 'All',
    icon: faList,
  },
  {
    to: routes.CATEGORY,
    label: 'Category',
    icon: faTableCellsLarge,
  },
];

export default sidebarMenu;
