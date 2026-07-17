import { getTranslation } from './utils/getTranslation';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';
import { taskActions } from './services/taskActions';
import VaultSidePanel from './components/VaultSidePanel';
import vaultSidePanel from './panel/VaultSidePanel';
import { HomePage } from './pages/HomePage';

import RunCustomAction from './components/RunCustomAction';
import OpenPreviewAction from './components/OpenPreviewAction';
import BulkPublishAction from './components/BulkPublishAction';
import pluginApi from './apis/pluginApi';

export default {
  register(app) {
    app.registerPlugin({
      id: PLUGIN_ID,
      name: PLUGIN_ID,
      apis: pluginApi,
      injectionZones: {
        HomePage: {
          top: [],
          middle: [],
          bottom: [],
        },
      },
      initializer: Initializer,
      isReady: false,
    });

    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: `${PLUGIN_ID}.plugin.name`,
        defaultMessage: PLUGIN_ID,
      },
      Component: () => import('./pages/App'),
      permissions: [],
    });

    app.addSettingsLink(
      {
        id: 'task-vault',
        intlLabel: {
          id: `${PLUGIN_ID}.settings.section-label`,
          defaultMessage: 'Task Vault Plugin',
        },
      },
      [
        {
          intlLabel: {
            id: `${PLUGIN_ID}.settings.cronConfigurations`,
            defaultMessage: 'Cron Configuration',
          },
          id: 'cron',
          to: `${PLUGIN_ID}/cron`,
          Component: () => import('./pages/Settings/CronConfiguration'),
          permission: [],
          position: 1,
          licenseOnly: true,
          exact: true,
        },
        {
          intlLabel: {
            id: `${PLUGIN_ID}.settings.achievements`,
            defaultMessage: 'Achievements',
          },
          id: 'achievements',
          to: `${PLUGIN_ID}/achievements`,
          permissions: [],
          position: 2,
          licenseOnly: false,
          exact: true,

          Component: () => import('./pages/Settings/Achievements'),
        },
        {
          intlLabel: {
            id: `${PLUGIN_ID}.settings.analytics`,
            defaultMessage: 'Analytics',
          },
          id: 'analytics',
          to: `${PLUGIN_ID}/analytics`,
          permissions: [],
          position: 3,
          licenseOnly: false,
          exact: true,
          Component: () => import('./pages/Settings/Analytics'),
        },
        {
          intlLabel: {
            id: `${PLUGIN_ID}.settings.notifications`,
            defaultMessage: 'Notification',
          },
          id: 'notifications',
          to: `${PLUGIN_ID}/notifications`,
          permissions: [],
          position: 7,
          licenseOnly: false,
          exact: true,

          Component: () => import('./pages/Settings/Notifications'),
        },
        {
          intlLabel: {
            id: `${PLUGIN_ID}.settings.reports`,
            defaultMessage: 'Reports',
          },
          id: 'reports',
          to: `${PLUGIN_ID}/reports`,
          permissions: [],
          position: 6,
          licenseOnly: false,
          exact: true,

          Component: () => import('./pages/Settings/Reports'),
        },
        {
          intlLabel: {
            id: `${PLUGIN_ID}.settings.productivityScoring`,
            defaultMessage: 'Productivity SvaultSideInjectionPanelcoring',
          },
          id: 'productivityScoring',
          to: `${PLUGIN_ID}/productivity-scoring`,
          permissions: [],
          position: 5,
          licenseOnly: false,
          exact: true,

          Component: () => import('./pages/Settings/ProductivityScoring'),
        },
        {
          intlLabel: {
            id: `${PLUGIN_ID}.settings.maintenance`,
            defaultMessage: 'Maintenance',
          },
          id: 'maintenance',
          to: `${PLUGIN_ID}/maintenance`,
          permissions: [],
          position: 3,
          licenseOnly: false,
          exact: true,
          Component: () => import('./pages/Settings/Maintenance'),
        },
      ]
    );
  },

  bootstrap(app) {
    // Document action menu item
    app
      .getPlugin('content-manager')
      .apis.addDocumentAction((actions) => [...actions, RunCustomAction]);

    // Edit View header action
    app
      .getPlugin('content-manager')
      .apis.addDocumentHeaderAction((actions) => [...actions, OpenPreviewAction]);

    // List View bulk action
    app
      .getPlugin('content-manager')
      .apis.addBulkAction((actions) => [...actions, BulkPublishAction]);

    // Edit View side panel
    app.getPlugin('content-manager').apis.addEditViewSidePanel([vaultSidePanel]);

    // Injection zone (plugin-defined zone)
    app.getPlugin('content-manager').injectComponent('editView', 'right-links', {
      name: `${PLUGIN_ID}.custom-link`,
      Component: HomePage,
    });

    app.getPlugin('content-manager').injectComponent('listView', 'actions', {
      name: `${PLUGIN_ID}.custom-link`,
      Component: VaultSidePanel,
    });
    app.getPlugin('content-manager').injectComponent('listView', 'publishModalAdditionalInfos', {
      name: `${PLUGIN_ID}.custom-link`,
      Component: VaultSidePanel,
    });
    app.getPlugin('content-manager').injectComponent('listView', 'unpublishModalAdditionalInfos', {
      name: `${PLUGIN_ID}.custom-link`,
      Component: VaultSidePanel,
    });
    app.getPlugin('content-manager').injectComponent('listView', 'deleteModalAdditionalInfos', {
      name: `${PLUGIN_ID}.custom-link`,
      Component: VaultSidePanel,
    });

    app.getPlugin('content-manager').injectComponent('preview', 'actions', {
      name: `${PLUGIN_ID}.custom-link`,
      Component: VaultSidePanel,
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
