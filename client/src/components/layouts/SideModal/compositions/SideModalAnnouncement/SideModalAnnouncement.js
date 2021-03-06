import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

import { Item, Box } from "src/components/blocks";
import { Typography, Button } from "src/components/elements";
import { SideModal } from "src/components/layouts";
import { AnnouncementInformation, AnnouncementEdit } from "./components";

import {
  getAnnouncement,
  deleteAnnouncement
} from "src/services/session/actions/announcementsActionCreators";
import enums from "src/services/enums";

export class SideModalAnnouncement extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditOpen: false
    };
  }

  componentDidMount() {
    const { match, getAnnouncement } = this.props;

    getAnnouncement(match.params.id);
  }

  handleToggleEdit = e => {
    this.setState({ isEditOpen: !this.state.isEditOpen });
  };

  handleDelete = e => {
    e.preventDefault();
    const { deleteAnnouncement, history, match } = this.props;

    if (window.confirm("Are you sure you want to delete this announcement?")) {
      deleteAnnouncement(match.params.id).then(() => {
        history.goBack();
      });
    }
  };

  renderError = () => {
    return <Typography variant="base">An error occurred</Typography>;
  };

  renderContent = () => {
    const {
      announcement: { data },
      auth
    } = this.props;
    const { isEditOpen } = this.state;

    return (
      <Fragment>
        {auth.user.role === enums.roles.ADMINISTRATOR ||
        auth.user.id === data.user._id ? (
          <Box margin="stack-l">
            {isEditOpen ? (
              <Button variant="secondary" icon onClick={this.handleToggleEdit}>
                <i className="fas fa-arrow-left" />
                <span id="hidden">Back</span>
              </Button>
            ) : (
              <Fragment>
                <Item margin="inline-base">
                  <Button variant="secondary" onClick={this.handleToggleEdit}>
                    Edit Announcement
                  </Button>
                </Item>
                <Item>
                  <Button variant="secondary" onClick={this.handleDelete}>
                    Delete Announcement
                  </Button>
                </Item>
              </Fragment>
            )}
          </Box>
        ) : null}

        {isEditOpen ? (
          <AnnouncementEdit handleToggleEdit={this.handleToggleEdit} />
        ) : (
          <AnnouncementInformation />
        )}
      </Fragment>
    );
  };

  render() {
    const {
      announcement: { data, isLoading }
    } = this.props;

    return (
      <SideModal>
        <SideModal.Header title="Announcement" />

        <SideModal.Body isLoading={isLoading}>
          {data && this.renderContent()}

          {!data && !isLoading && this.renderError()}
        </SideModal.Body>
      </SideModal>
    );
  }
}

export default withRouter(
  connect(
    state => ({
      announcement: state.announcements.announcement,
      auth: state.auth
    }),
    {
      getAnnouncement: getAnnouncement,
      deleteAnnouncement: deleteAnnouncement
    }
  )(SideModalAnnouncement)
);
