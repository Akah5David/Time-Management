import { Main, Link, Button } from '@strapi/design-system';
import { useFetchClient } from '@strapi/strapi/admin';

import { useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';

import { getTranslation } from '../utils/getTranslation';

import { CustomInjectionZone } from '../injection-zone-components/CustomInjectionZone';

const OldHomePage = () => {
  const { formatMessage } = useIntl();
  const admin_app = useSelector((state) => state.admin_app);

  const { get } = useFetchClient();
  const [subtasks, setSubtask] = useState([
    {
      title: 'Nothing',
      completed: true,
      task: 'wake up',
    },
  ]);

  console.log('admin_app: ', admin_app);

  console.log('getTranslation', getTranslation);

  useEffect(() => {
    const fetchSubtasks = async () => {
      try {
        const { data } = await get('/subtasks');

        if (data.length === 0) {
          return [];
        }

        setSubtask(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchSubtasks();
  }, []);

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
      <Link href="task-vault/dashboard">Go to Dashboard</Link>
      <Button>
        {formatMessage({
          id: getTranslation('create'),
          defaultMessage: 'Create New Item',
        })}
      </Button>
      <ol>
        {subtasks.map((subtask) => (
          <li key={subtask.title}>
            <p>{subtask.title}</p>
            <p>{subtask.completed === true ? 'True' : 'False'}</p>
            <p>{subtask.task}</p>
          </li>
        ))}
      </ol>
    </div>
  );
};

export { OldHomePage };
