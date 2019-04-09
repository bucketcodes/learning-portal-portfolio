import React, { Component } from "react";
import { Grid, Paper, Typography, Divider, Button } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary,
    minHeight: 200
  },
  section: {},
  orange: {
    color: "white",
    backgroundColor: "#f37949",
    "&:hover": {
      backgroundColor: "#aa5433"
    }
  }
});

export class TeacherDashboard extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };
  async componentDidMount() {
    const { firestore } = this.context.store;
    await firestore.get({
      collection: "lessons",
      where: ["post_author", "==", this.props.auth.uid]
    });
    await firestore.get({
      collection: "users",
      where: ["uid", "==", this.props.auth.uid]
    })
    console.log(`Connected with ${this.props.auth.uid}`);

    console.log(this.props.lessons);
  }

  async componentWillUnmount() {}

  render() {
    const { classes, lessons } = this.props;
    let wipLessons = "";
    //let unpublishedLessons = "";
    let publishedLessons = "";
    if (lessons) {
      wipLessons = lessons.filter(lesson => lesson.post_status === "wip");
      //unpublishedLessons = lessons.filter(
      //   lesson => lesson.post_status === "draft"
      // );
      publishedLessons = lessons.filter(
        lesson => lesson.post_status === "publish"
      );
    }
    let activeUserID = this.props.activeUser ? this.props.activeUser[0].id : null;

    return (
      <div
        style={{ maxWidth: "1400px", padding: "40px", margin: "auto" }}
        className={classes.root}
      >
        <Grid container spacing={24}>
          <Grid item xs={6} className={classes.section}>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              Work in Progress
            </Typography>
            <Paper className={classes.paper}>
              {wipLessons &&
                wipLessons.map(lesson => (
                  <div key={lesson.id}>
                    <div
                      style={{
                        height: 60,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row"
                      }}
                    >
                      {lesson.post_title}
                      <Link to={`/edit/${lesson.id}/${activeUserID}`} style={{textDecoration: 'none'}}>
                        <Button variant="contained" className={classes.orange}>
                          Edit
                        </Button>
                      </Link>
                      
                    </div>
                    <Divider />
                  </div>
                ))}
              {wipLessons.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px"
                  }}
                >
                  <Typography variant="h5" style={{ fontWeight: 300 }}>
                    No Lessons!
                  </Typography>
                </div>
              )}
            </Paper>
          </Grid>
          <Grid item xs={6} className={classes.section}>
            <Typography variant="h4" style={{ textAlign: "center" }}>
              Published Lessons
            </Typography>
            <Paper className={classes.paper}>
              {publishedLessons &&
                publishedLessons.map(lesson => (
                  <div key={lesson.id}>
                    <div
                      style={{
                        height: 60,
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flexDirection: "row"
                      }}
                    >
                      {lesson.post_title}
                      <div style={{ display: "flex", flexDirection: "row" }}>
                        <div style={{ paddingLeft: 5, paddingRight: 5 }}>
                          <Link to={`/edit/${lesson.id}/${activeUserID}`} style={{textDecoration: 'none'}}>
                            <Button color="primary" variant="outlined">
                              Edit
                            </Button>
                          </Link>
                        </div>
                        <div style={{ paddingLeft: 5 }}>
                          <Link to={`/lesson/${lesson.id}/${activeUserID}`} style={{textDecoration: 'none'}}>
                            <Button color="secondary" variant="contained">
                              View
                            </Button>
                          </Link>
                        </div>
                      </div>
                    </div>

                    <Divider />
                  </div>
                ))}
              {publishedLessons.length === 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "200px"
                  }}
                >
                  <Typography variant="h5" style={{ fontWeight: 300 }}>
                    No Lessons!
                  </Typography>
                </div>
              )}
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const mapState = state => {
  return {
    auth: state.firebase.auth,
    lessons: state.firestore.ordered.lessons,
    activeUser: state.firestore.ordered.users
  };
};

export default connect(mapState)(withStyles(styles)(TeacherDashboard));
