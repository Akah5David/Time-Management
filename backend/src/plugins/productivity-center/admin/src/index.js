import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID, PLUGIN_NAME } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

export default {
  register(app) {
    console.log('REGISTER FUNCTION RUNNING');
    app.addMenuLink({
      to: `/plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: () => import('./pages/App'),
      permissions: [],
      position: 1,
      target: '_blank',
      licenseOnly: true,
      notificationCount: 2,
      exact: true,
    });

    app.addSettingsLink(
      {
        id: PLUGIN_ID,
        intlLabel: {
          id: `${PLUGIN_ID}.settings.section-label`,
          defaultMessage: 'My Plugin Settings',
        },
      },
      [
        {
          intlLabel: {
            id: `${PLUGIN_ID}.settings.general`,
            defaultMessage: 'General',
          },
          id: 'general',
          to: `${PLUGIN_ID}/general`,
          Component: () => import('./pages/Settings/General'),
        },
        {
          intlLabel: {
            id: `${PLUGIN_ID}.settings.advanced`,
            defaultMessage: 'Advanced',
          },
          id: 'advanced',
          to: `${PLUGIN_ID}advanced`,
          Component: () => import('./pages/Settings/Advanced'),
        },
      ]
    );

    app.registerPlugin({
      id: PLUGIN_ID,
      name: PLUGIN_NAME,
      api: {},
      initializer: Initializer,
      injectionZones: {},
      isReady: false,
    });
  },
  bootstrap(app) {
    app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
      name: 'my-compo',
      Component: () => 'my-compo',
    });
  },
  async registerTrads({ locales }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          const newData = {};
          const keys = Object.keys(data);

          for (const key of keys) {
            newData[getTranslation(key)] = data[key];
          }

          return { data: newData, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
