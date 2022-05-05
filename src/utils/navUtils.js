import { crearSubHeader, createItem, createItems } from '../layouts/dashboard/navbar/NavConfig';
import { PATH_DASHBOARD } from '../routes/paths';

export const generateNavRoles = (roles) => {
  let MenuLinks = [];
  let object;
  var a = -1;
  if (roles) {
    roles.forEach((rol) => {
      if (rol.CODIGO.length === 1) {
        object = {};
        MenuLinks.push(object);
        object.subheader = rol.NOMBRE;
        object.items = [];
      } else if (rol.CODIGO.length === 4) {
        object.items.push(
          crearSubHeader({ title: rol.NOMBRE, icon: rol.ICON, path: PATH_DASHBOARD.root + rol.ROUTE, items: null })
        );
      } else if (rol.CODIGO.length === 7) {
        a = object.items.length - 1;
        if (object.items[a].children === undefined) {
          object.items[a].children = [];
        }
        object.items[a].children.push(
          createItems({ title: rol.NOMBRE, children: null, path: PATH_DASHBOARD.root + rol.ROUTE })
        );
      } else if (rol.CODIGO.length === 10) {
        let b = object.items[a].children.length - 1;
        if (object.items[a].children[b].children === null) {
          object.items[a].children[b].children = [];
        }
        object.items[a].children[b].children.push(
          createItem({ title: rol.NOMBRE, path: PATH_DASHBOARD.root + rol.ROUTE })
        );
      }
    });
  }
  return MenuLinks;
};
