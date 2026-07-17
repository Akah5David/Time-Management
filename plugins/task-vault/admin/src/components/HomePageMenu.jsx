import { CustomInjectionZone } from '../injection-zone-components/CustomInjectionZone';

const HomePage = () => {
  return (
    <div>
      <h1>HomePage</h1>

      {/* Render components injected into the top zone */}
      <CustomInjectionZone area="task-value.HomePage.top" />

      <div>
        <br>
          <h1>james Andrew</h1>
        </br>
        <br>
          <h1>Timothy Andrew</h1>
        </br>
        <br>
          <h1>Anthonia Andrew</h1>
        </br>
      </div>

      {/* Render components injected into the bottom zone */}
      <CustomInjectionZone area="task-value.HomePage.bottom" />
    </div>
  );
};

export default HomePage;
