import React from "react";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import SvgIcon from "@material-ui/core/SvgIcon";
import Paper from "@material-ui/core/Paper";
import { CircularProgress, Hidden } from "@material-ui/core";
import dog from "../../../dog.jpg";
import FlipMove from "react-flip-move";
import { Link } from "react-router-dom";
import { isLoaded } from "react-redux-firebase";
import PropTypes from "prop-types";


export default class EachLesson extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  findGrade = grade => {
    let index2 = this.props.gradeLevel.findIndex(i => i.value === grade);
    if (index2 && this.props.gradeLevel[index2] !== undefined) {
      return this.props.gradeLevel[index2].label;
    } else {
      return "Any";
    }
  };

  findSubject = subject => {
    let index = this.props.subjectList.findIndex(x => x.value === subject);
    return this.props.subjectList[index].label;
  };

  findFavorite = id => {
    let {firebase, firestore} = this.context.store;

    let currentUID = firebase.auth().currentUser.uid;

    let user = this.props.users.filter(e => e.uid === currentUID)[0]


    if (user && user.favoriteLesson && user.favoriteLesson.includes(id)){
      return 'red'
    }else{
      return 'black'
    }
    
  }


  render() {
    const { listOfLessons, classes, lessons, users } = this.props;

    return (
      <Grid item xs={12} sm={9}>
        <Paper style={{ minHeight: "80vh" }} elevation={1}>
          <Grid item xs={12} style={{ display: "flex", flexDirection: "column" }}>
            <div> 
              <div
                style={{
                  display: "flex",
                  flexDirection: "row",
                  height: "40px",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                  
                }}
              >
                <Hidden only={['xs', 'sm']}><Grid
                  className={classes.lessonGrid}
                  item
                  xs={2}
                  style={{ textAlign: "center" }}
                  
                >
                  <Typography>Author</Typography>
                </Grid></Hidden>
                <Grid
                  className={classes.lessonGrid}
                  item
                  xs={6} md={5}
                  style={{ textAlign: "center" }}
                >
                  <Typography>Title</Typography>
                </Grid>
                <Grid
                  className={classes.lessonGrid}
                  item
                  xs={3} md={1}
                  style={{ textAlign: "center" }}
                >
                  <Typography>Grade</Typography>
                </Grid>
                <Grid
                  className={classes.lessonGrid}
                  item
                  xs={3} md={1}
                  style={{ textAlign: "center" }}
                >
                  <Typography>Subject</Typography>
                </Grid>
                <Hidden only={['xs', 'sm']}><Grid
                  className={classes.lessonGrid}
                  item
                  xs={1}
                  style={{ textAlign: "center" }}
                >
                  <Typography>Favorite</Typography>
                </Grid></Hidden>
              </div>
              <Divider />
            </div>

            {!isLoaded(lessons) && (
              <CircularProgress
                size={80}
                thickness={8}
                className={classes.progress}
              />
            )}
            <FlipMove
              enterAnimation="fade"
              leaveAnimation="fade"
              appearAnimation="accordionVertical"
            >
              {listOfLessons &&
                listOfLessons.map(lesson => (
                  <div key={lesson.id}>
                    <a style={{textDecoration: 'none'}}
                      href={
                        users && users.find(e => e.uid === lesson.post_author)
                          ? `/lesson/${lesson.id}/${lesson.post_author}`
                          : "/lessons"
                      }
                    >
                      <div
                        key={Math.random() * Math.random()}
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          height: "80px",
                          alignItems: "center",
                          width: "100%",
                          justifyContent: "space-between"
                        }}
                      >
                        <Hidden only={['xs', 'sm']}><Grid
                          className={classes.lessonGrid}
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            height: "80px",
                            alignItems: "center"
                          }}
                          
                          item
                          xs={2}
                        >
                          <Avatar
                            src={
                              users &&
                              users.find(e => e.uid === lesson.post_author) &&
                              users.find(e => e.uid === lesson.post_author)
                                .photoURL
                                ? users.find(e => e.uid === lesson.post_author)
                                    .photoURL
                                : dog
                            }
                          />
                          
                          <Typography style={{ marginLeft: "10px" }}>
                            {
                               users &&
                             users.length > 0 &&
                             users.find(e => e.uid === lesson.post_author)
                               ? users.find(e => e.uid === lesson.post_author)
                                   .name
                               : "Loading..."
                          }
                          </Typography>
                          {users &&
                             users.length > 1 &&
                             users.find(e => e.uid === lesson.post_author) && users.find(e => e.uid === lesson.post_author).fellow && 
                          <SvgIcon style={{filter: 'drop-shadow(2px 2px 2px rgba(20,20,20,0.4)', marginLeft: -25, marginTop: -10, fontSize: 70, color: 'gold', position: 'absolute',}}>
                            <path d='M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z' />
                          </SvgIcon>}
                        </Grid></Hidden>

                        <Grid
                          className={classes.lessonGrid}
                          item
                          xs={6} md={5}
                          style={{ textAlign: "center" }}
                        >
                          <Typography>
                            <b>"{lesson.post_title}"</b>
                          </Typography>
                        </Grid>

                        <Grid
                          className={classes.lessonGrid}
                          item
                          xs={3} md={1}
                          style={{ textAlign: "center" }}
                        >
                          <Typography>
                            {this.findGrade(lesson.Grade)}
                          </Typography>
                        </Grid>

                        <Grid
                          className={classes.lessonGrid}
                          item
                          xs={3} md={1}
                          style={{ textAlign: "center" }}
                        >
                          <Typography>
                            {this.findSubject(lesson.Subjects)}
                          </Typography>
                        </Grid>

                        <Hidden only={['xs', 'sm']}><Grid
                          className={classes.lessonGrid}
                          item
                          xs={1}
                          style={{ textAlign: "center" }}
                        >
                          {!this.props.disabledFav ? 
                          <SvgIcon style={{color: this.findFavorite(lesson.id), zIndex: 9000}} onClick={(e) => this.props.handleFavorite(lesson.id, e)}>
                            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                          </SvgIcon>
                          : <CircularProgress size={30} />}

                        </Grid></Hidden>
                      </div>
                    </a>
                    <Divider />
                  </div>
                ))}
            </FlipMove>
          </Grid>
        </Paper>
      </Grid>
    );
  }
}
