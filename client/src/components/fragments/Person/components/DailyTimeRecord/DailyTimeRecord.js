import React, { Component, Fragment } from "react";
import format from "date-fns/format";
import differenceInSeconds from "date-fns/difference_in_seconds";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import { DataGroup } from "src/components/compounds";

import returnTimeElapsed from "src/services/utils/returnTimeElapsed";

export class DailyTimeRecord extends Component {
  render() {
    const {
      data: {
        roleData: { clocks }
      }
    } = this.props;

    return (
      <Fragment>
<<<<<<< HEAD
        <Item margin="stack-base">
          <Typography variant="display-2">Daily Time Record</Typography>
        </Item>

        <Item margin="stack-l">
          <Typography variant="caption">Reminder: Clocks less than 15 minutes are not recorded.</Typography>
=======
        <Item margin="stack-l">
          <Typography variant="display-2">Daily Time Record</Typography>
>>>>>>> 04fc1b21871281f6d5c8d38452bf8d5d7bce8b59
        </Item>

        {clocks.length === 0 ? (
          <Item margin="stack-l">
            <Typography variant="base">No record</Typography>
          </Item>
        ) : (
          clocks.map(clock => (
            <Item margin="stack-base" key={clock._id}>
              <DataGroup>
                <DataGroup.Label title={format(clock.in, "MMM D YYYY")} />

                <DataGroup.Content>
                  <Typography variant="body">
                    {`${format(clock.in, "HH:mm")} - ${
                      clock.out
                        ? `${format(clock.out, "HH:mm")} (${returnTimeElapsed(
                            differenceInSeconds(clock.out, clock.in)
                          )})`
                        : "Ongoing"
                    }`}
                  </Typography>
                </DataGroup.Content>
              </DataGroup>
            </Item>
          ))
        )}
      </Fragment>
    );
  }
}

export default DailyTimeRecord;
