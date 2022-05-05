// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import Iconify from '../../../components/Iconify';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_calendar'),
  ecommerce: getIcon('ic_ecommerce'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_dashboard'),
  menuItem: getIcon('ic_menu_item'),
};

export const crearSubHeader = ({ title, icon, path, items = null }) => {
  if (items === null) {
    return { title, icon: getIcon(icon), path };
  }
  return { title, items, icon: getIcon(icon), path };
};
export const createItems = ({ title, path, children = null }) => ({ title, children, path });

export const createItem = ({ title, path }) => ({ title, path });

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [{ title: 'app', path: PATH_DASHBOARD.general.app, icon: ICONS.dashboard }],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  {
    subheader: 'app',
    items: [],
  },

  // DEMO MENU STATES
  {
    subheader: 'Other cases',
    items: [
      {
        // default roles : All roles can see this entry.
        // roles: ['user'] Only users can see this item.
        // roles: ['admin'] Only admin can see this item.
        // roles: ['admin', 'manager'] Only admin/manager can see this item.
        // Reference from 'src/guards/RoleBasedGuard'.
        title: 'item_by_roles',
        path: PATH_DASHBOARD.permissionDenied,
        icon: ICONS.menuItem,
        caption: 'only_admin_can_see_this_item',
      },
      {
        title: 'menu_level_1',
        path: '#1',
        icon: ICONS.menuItem,
        children: [
          { title: 'menu_level_2', path: '#2', disabled: true },
          {
            title: 'menu_level_2',
            path: '#3',
            children: [
              { title: 'menu_level_3', path: '#4' },
              { title: 'menu_level_3', path: '#5' },
            ],
          },
        ],
      },
      { title: 'item_disabled', path: '#disabled', icon: ICONS.menuItem, disabled: true },
      {
        title: 'item_label',
        path: '#label',
        icon: ICONS.menuItem,
        info: (
          <Label color="info" startIcon={<Iconify icon="eva:email-fill" />}>
            NEW
          </Label>
        ),
      },
      { title: 'item_caption', path: '#caption', icon: ICONS.menuItem, caption: 'description' },
    ],
  },
];

export default navConfig;
