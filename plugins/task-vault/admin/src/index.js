import { getTranslation } from './utils/getTranslation';
import { prefixPluginTranslations } from './utils/prefixPluginTranslations';
import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import { PluginIcon } from './components/PluginIcon';

import VaultSidePanel from './components/VaultSidePanel';
import vaultSidePanel from './panel/VaultSidePanel';
import { HomePage } from './pages/HomePage';

import RunCustomAction from './components/RunCustomAction';
import OpenPreviewAction from './components/OpenPreviewAction';
import BulkPublishAction from './components/BulkPublishAction';
import pluginApi from './apis/pluginApi';
import taskVaultReducer from './redux-toolkit/taskVaultSlice';

const reducers = {
  'task-vault': taskVaultReducer,
};

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

    //creates a Hook Id that external plugin can use to insert a component in task-vault Dasboard Page
    app.createHook(`${PLUGIN_ID}/Dashboard/cards`);

    app.createHook(`${PLUGIN_ID}/Dashboard/reminders`);
    app.createHook(`${PLUGIN_ID}/Dashboard/subtasks`);

    app.addReducers(reducers);

    app.addMenuLink({
      to: `plugins/${PLUGIN_ID}`,
      icon: PluginIcon,
      intlLabel: {
        id: getTranslation('plugin.name'),
        defaultMessage: PLUGIN_ID,
      },
      Component: () => import('./pages/App'),
      permissions: [],
    });

    app.addSettingsLink(
      {
        id: 'task-vault',
        intlLabel: {
          id: getTranslation('settings.section-label'),
          defaultMessage: 'Task Vault Plugin',
        },
      },
      [
        {
          intlLabel: {
            id: getTranslation('settings.cronConfigurations'),
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
            id: getTranslation('settings.achievements'),
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
            id: getTranslation('settings.analytics'),
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
            id: getTranslation('settings.notifications'),
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
            id: getTranslation('settings.reports'),
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
            id: getTranslation('settings.productivityScoring'),
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
            id: getTranslation('ettings.maintenances'),
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
    const importedTranslations = await Promise.all(
      locales.map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, PLUGIN_ID),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return importedTranslations;
  },
};
