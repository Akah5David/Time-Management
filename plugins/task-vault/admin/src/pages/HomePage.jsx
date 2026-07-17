import { Main } from '@strapi/design-system';
import { useIntl } from 'react-intl';

import { getTranslation } from '../utils/getTranslation';
import { CustomInjectionZone } from '../injection-zone-components/CustomInjectionZone';

const HomePage = () => {
  const { formatMessage } = useIntl();
  return (
    <div>
      <h1>HomePage</h1>
      {/* Render components injected into the top zone */}
      <CustomInjectionZone area="task-value.HomePage.top" />
      <br /> <br />{' '}
      <div>
        <h1>james Andrew</h1>
        <br />
        <h1>Timothy Andrew</h1>
        <br />
        <h1>Anthonia Andrew</h1>
        <br />
        <Main>
          <h1>Welcome to {formatMessage({ id: getTranslation('plugin.name') })}</h1>
        </Main>
        <br /> <br />{' '}
      </div>
      {/* Render components injected into the bottom zone */}
      <CustomInjectionZone area="task-value.HomePage.bottom" />
    </div>
  );
};

export { HomePage };
