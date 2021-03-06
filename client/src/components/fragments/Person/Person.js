import React, { Component } from "react";
import { withRouter, Switch, Route, Redirect } from "react-router-dom";

import PersonAccount from "./components/PersonAccount/PersonAccount";
import TraineeSchedule from "./components/TraineeSchedule/TraineeSchedule";
import DailyTimeRecord from "./components/DailyTimeRecord/DailyTimeRecord";
import Tasks from "./components/Tasks/Tasks";
import Calendar from "./components/Calendar/Calendar";
import Leaves from "./components/Leaves/Leaves";

import enums from "src/services/enums";

export class Person extends Component {
  render() {
    const { match, person } = this.props;

    return (
      <Switch>
        <Route
          path={`${match.url}`}
          exact
          render={() => <PersonAccount person={person} />}
        />

        {/* >>> Should be in separate conditional to avoid warning.. ??? */}
        {person.data.role === enums.roles.TRAINEE && (
          <Route
            path={`${match.url}/schedule`}
            render={() => <TraineeSchedule person={person} />}
          />
        )}
        {person.data.role === enums.roles.TRAINEE && (
          <Route
            path={`${match.url}/daily-time-record`}
            render={() => <DailyTimeRecord person={person} />}
          />
        )}
        {person.data.role === enums.roles.TRAINEE && (
          <Route path={`${match.url}/tasks`} render={() => <Tasks />} />
        )}
        {person.data.role === enums.roles.TRAINEE && (
          <Route
            path={`${match.url}/attendance`}
            render={() => <Calendar person={person} />}
          />
        )}
        {person.data.role === enums.roles.TRAINEE && (
          <Route
            path={`${match.url}/leaves`}
            render={() => <Leaves person={person} />}
          />
        )}

        <Redirect to={`${match.url}`} replace />
      </Switch>
    );
  }
}

export default withRouter(Person);
