import { useStrapiApp } from '@strapi/strapi/admin';

import { getInjectedComponents } from '../utils/componentRegistry';

export const CustomInjectionZone = ({ area, ...props }) => {
  console.log('CustomInjectionZone rendered');

  const [, view, zone] = area.split('.');

  console.log(area);

  //returns an array that contains all the object passed to the a injection zone in ur plugin
  const components = getInjectedComponents(view, zone);

  console.log(components);

  if (!components?.length) {
    return null;
  }

  return components.map(({ name, Component }) => <Component key={name} {...props} />);
};
