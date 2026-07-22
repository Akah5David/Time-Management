import { Shield, Drag, Pencil, Plus, Filter, ChevronLeft, ChevronRight } from '@strapi/icons';
import { Box, Button } from '@strapi/design-system';

import {
  DashBoardMain,
  ActivityUl,
  StatiscticUl,
  ActivityLi,
  StatisticsLi,
  StatisticsDiv,
  ProjectDiv,
  RecentDiv,
  ShieldDiv,
  SystemDiv,
  TaskTable,
  FilterButton,
  TableButton,
  OperationDiv,
  NewTaskButton,
  UrgentDiv,
  InjectionZone,
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
              <h3 class="value">50</h3>
            </StatisticsDiv>
            <ShieldDiv>
              <Shield />
              <p>+50%</p>
            </ShieldDiv>
          </StatisticsLi>
          <StatisticsLi>
            <StatisticsDiv>
              <p class="title">Completed Tasks</p>
              <h3 class="value">50</h3>
            </StatisticsDiv>
            <ShieldDiv>
              <Shield />
              <p>Steady</p>
            </ShieldDiv>
          </StatisticsLi>

          <StatisticsLi>
            <StatisticsDiv>
              <p class="title">Pending Tasks</p>
              <h3 class="value">50</h3>
            </StatisticsDiv>
            <ShieldDiv>
              <Shield />
              <p>Authorized</p>
            </ShieldDiv>
          </StatisticsLi>
          <StatisticsLi>
            <StatisticsDiv>
              <p class="title">Projects</p>
              <h3 class="value">50</h3>
            </StatisticsDiv>
            <ShieldDiv>
              <Shield />
              <p>Action Required</p>
            </ShieldDiv>
          </StatisticsLi>
        </StatiscticUl>
      </section>

      {/*RECENT ACTIVITY*/}
      <section>
        <ActivityUl>
          <RecentDiv>
            <ProjectDiv>
              <h1>Recent Projects</h1>
              <button onClick>view all</button>
            </ProjectDiv>

            <div id="created-updated">
              <div id="recent-projects">
                <ActivityLi>
                  <div class="project-title">
                    <h1 class="title">Projects Created</h1>
                    <Drag />
                  </div>
                  <div class="project-content">
                    <p>project content</p>
                  </div>
                  <div class="progress-details">
                    <div class="progress-info">
                      <p>Progress</p>
                      <p>75%</p>
                    </div>
                    <div class="percentage-bar">
                      <p>percentage bar</p>
                    </div>
                  </div>
                </ActivityLi>

                <ActivityLi>
                  <div class="project-title">
                    <h1 class="title">Projects Created</h1>
                    <Drag />
                  </div>
                  <div class="project-content">
                    <p>project content</p>
                  </div>
                  <div class="progress-details">
                    <div class="progress-info">
                      <p>Progress</p>
                      <p>75%</p>
                    </div>
                    <div class="percentage-bar">
                      <p>percentage bar</p>
                    </div>
                  </div>
                </ActivityLi>
              </div>
              <InjectionZone>injection zone</InjectionZone>
            </div>
          </RecentDiv>

          {/* Use as an Injection Zone */}
          <SystemDiv>
            <div id="system-header">
              <h4>System Users</h4>
              <button onClick="Button">Manage</button>
            </div>
            <div id="system-details">
              <div class="user-info">
                <div class="portfolio">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfTB7siMA55g28TlsaiRbKpmILmp9xnmlR0VFY8d29mQ&s=10" />
                  <div>
                    <h1>David Akah</h1>
                    <p>Role</p>
                  </div>
                </div>
                <div class="color"></div>
              </div>
              <div class="user-info">
                <div class="portfolio">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQfTB7siMA55g28TlsaiRbKpmILmp9xnmlR0VFY8d29mQ&s=10" />
                  <div>
                    <h5>David Akah</h5>
                    <p>Role</p>
                  </div>
                </div>
                <div class="color"></div>
              </div>
            </div>
          </SystemDiv>
        </ActivityUl>
      </section>

      <section>
        <OperationDiv>
          <UrgentDiv>
            <h3>Urgent Operational Tasks</h3>
            <div>
              <FilterButton>
                <Filter width={12} height={12} />
                <span>filter</span>
              </FilterButton>
              <NewTaskButton>
                <Plus width={12} height={12} />
                <span>New Task</span>
              </NewTaskButton>
            </div>
          </UrgentDiv>
          <TaskTable>
            <thead>
              <tr>
                <th>Priority</th>
                <th>Task Description</th>
                <th>Status</th>
                <th>DueDate</th>
                <th class="actions">Actions</th>
              </tr>
            </thead>

            <tbody>
              <tr id="critical">
                <td class="critical">
                  <span>critical</span>
                </td>
                <td class="project-col">
                  <h4>Becoming a working Intern</h4>
                  <p>brief explanation</p>
                </td>
                <td>In progress</td>
                <td>Today, 4:00pm</td>
                <td className="actions">
                  <TableButton onClick>
                    <Pencil height={12} width={12} />
                  </TableButton>
                </td>
              </tr>
              <tr id="lower">
                <td className="lower">
                  <span>Lower</span>
                </td>
                <td class="project-col">
                  <h4>Becoming a working Intern</h4>
                  <p>brief explanation</p>
                </td>
                <td>In progress</td>
                <td>Today, 4:00pm</td>
                <td className="actions">
                  <TableButton onClick>
                    <Pencil height={12} width={12} />
                  </TableButton>
                </td>
              </tr>
            </tbody>

            <tfoot>
              <tr class="footer">
                <td colspan="4">showing 3 of 12 urgent tasks</td>
                <td class="chevron">
                  <TableButton>
                    <ChevronLeft height={12} width={12} />
                  </TableButton>
                  <TableButton>
                    <ChevronRight height={12} width={12} />
                  </TableButton>
                </td>
              </tr>
            </tfoot>
          </TaskTable>
        </OperationDiv>
      </section>
    </DashBoardMain>
  );
}
