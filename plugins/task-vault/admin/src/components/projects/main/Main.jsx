import { Shield } from '@strapi/icons';

import {
  DashBoardMain,
  ActivityUl,
  StatiscticUl,
  ActivityLi,
  StatisticsLi,
  StatisticsDiv,
  ProjectDiv,
  RecentDiv,
} from './styles';

export default function Main() {
  return (
    <DashBoardMain>
      {/*Statistics Card*/}
      <section>
        <StatiscticUl>
          <StatisticsLi>
            <StatisticsDiv>
              <p class="title">Total Tasks</p>
              <p class="value">50</p>
            </StatisticsDiv>
            <Shield />
          </StatisticsLi>

          <StatisticsLi>
            <StatisticsDiv>
              <p class="title">Completed Tasks</p>
              <p class="value">50</p>
            </StatisticsDiv>
            <Shield />
          </StatisticsLi>

          <StatisticsLi>
            <StatisticsDiv>
              <p class="title">Pending Tasks</p>
              <p class="value">50</p>
            </StatisticsDiv>
            <Shield />
          </StatisticsLi>

          <StatisticsLi>
            <StatisticsDiv>
              <p class="title">Projects</p>
              <p class="value">50</p>
            </StatisticsDiv>
            <Shield />
          </StatisticsLi>
        </StatiscticUl>
      </section>

      {/*RECENT ACTIVITY*/}
      <section>
        <RecentDiv>
          <ProjectDiv>
            <h1>External Website Advertisement</h1>
            <div id="project-color">
              <div>project color</div>
              <p>project stautus</p>
            </div>
          </ProjectDiv>

          <ActivityUl>
            <div id="created-updated">
              {' '}
              <ActivityLi>
                <p class="title">Projects Created</p>
                <p class="value">80</p>
              </ActivityLi>
              <ActivityLi>
                <p class="title">Tasks</p>
                <p class="value">50</p>
              </ActivityLi>
              <ActivityLi>
                <p class="title">Up Coming</p>
                <p class="value">42</p>
              </ActivityLi>
            </div>

            <div id="pending-complete">
              <ActivityLi>
                <p class="title">Projects Complete</p>
                <p class="value">60</p>
              </ActivityLi>
              <ActivityLi>
                <p class="title">Projects Pending</p>
                <p class="value">50</p>
              </ActivityLi>
            </div>
          </ActivityUl>
        </RecentDiv>
      </section>
    </DashBoardMain>
  );
}
