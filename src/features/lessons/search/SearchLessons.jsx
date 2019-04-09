import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import MenuItem from "@material-ui/core/MenuItem";
import { connect } from "react-redux";
import EachLesson from "./EachLesson";
import Checkbox from "@material-ui/core/Checkbox";
import PropTypes from "prop-types";
import { compose } from "redux";
import { subjectList, gradeLevel } from "../../../app/const/selectors";
import { Link } from "react-router-dom";
import { Button, Divider, SvgIcon } from "@material-ui/core";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit
  },
  textField: {
    marginTop: theme.spacing.unit,
    width: "100%"
  },
  dense: {
    marginTop: 16
  },
  lessonGrid: {
    padding: theme.spacing.unit
  },
  progress: {
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "100px",
    opacity: 0.5
  },
  sticky: {
    position: "sticky!important",
    top: 20
  },
  orange: {
    color: "white",
    backgroundColor: "#f37949",
    "&:hover": {
      backgroundColor: "#aa5433"
    }
  }
});

class SearchLessons extends Component {
  state = {
    keywords: "",
    grade: "",
    subject: "",
    checkContent: false,
    lessonList: [],
    staffOnly: false,
    favoritesOnly: false,
    filteredMainLessons: []
  };
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value
    });
  };

  handleCheck = () => {
    this.state.checkContent
      ? this.setState({
          checkContent: false
        })
      : this.setState({
          checkContent: true
        });
  };
  handleOnlyStaff = () => {
    this.state.staffOnly
      ? this.setState({ staffOnly: false })
      : this.setState({ staffOnly: true });
  };
  componentDidMount() {
    const { firestore } = this.context.store;
    firestore.get('lessons')
    firestore.get('users')
 
  }

    componentWillReceiveProps() {
       if(this.props.lessons){
      const { firebase, firestore } = this.context.store;
        let mainLessons = this.props.lessons.filter(
          lesson => lesson.post_status === "publish"
        );

        let userID = firebase.auth().currentUser.uid;
        firestore.collection('users').where('uid', '==', userID).get().then(querySnapshot => {
          let userData = querySnapshot.docs[0].data()
          let favoriteLesson = userData.favoriteLesson ? userData.favoriteLesson : []

          let filteredMainLessons = mainLessons.filter(lesson => {
            if(favoriteLesson.includes(lesson.id)){ return true}
          })

          this.setState({filteredMainLessons})
        })
    }
    }

  handleOnlyFavorite = () => {
    this.state.favoritesOnly ? this.setState({favoritesOnly: false}) : this.setState({favoritesOnly: true})
  }

  handleFavorite = (id, e) => {
    e.preventDefault();
    const { firestore } = this.context.store;
    const { firebase } = this.context.store;

    let firebaseID = firebase.auth().currentUser.uid
    firestore.collection('users').where('uid', '==', firebaseID).get().then(querySnapshot => {
      let data = querySnapshot.docs[0].data()
     
      let favoriteLesson = data.favoriteLesson ? data.favoriteLesson : []

      if(favoriteLesson.find(e => e === id)){
        favoriteLesson.find(e => {
          if (e === id){
            let position = favoriteLesson.indexOf(e)

            delete favoriteLesson[position]
          }
        })

        this.setState({disabledFav: true})
        firestore.collection('users').doc(querySnapshot.docs[0].id).set({favoriteLesson: favoriteLesson.filter(e => e !== undefined)}, {merge: true}).then(() =>{

          firestore.get('users').then(() => {
            this.setState({disabledFav: false})
          })
        }) 
        
      }else{

        favoriteLesson.push(id)
        this.setState({disabledFav: true})
        firestore.collection('users').doc(querySnapshot.docs[0].id).set({favoriteLesson: favoriteLesson.filter(e => e !== undefined)}, {merge: true}).then(() => {
          firestore.get('users').then(() => {
            this.setState({disabledFav: false})

          })
        })
        
      }
      
    })



    // firestore.collection('users').doc()
  }

  render() {
    const { classes, lessons, loading, users } = this.props;

   

    let listOfLessons = [];
    if (lessons && lessons.length > 0 && users && users.length > 0) {
      let mainLessons;
      if (this.state.favoritesOnly){
        mainLessons = this.state.filteredMainLessons;    
      }else{
        mainLessons = lessons
      }
      if (this.state.staffOnly) {
        mainLessons = mainLessons.filter(
          lesson => lesson.post_status === "publish"
        );
        mainLessons = mainLessons.filter(lesson => {
          if (
            users.find(e => e.uid === lesson.post_author) !== undefined &&
            users.find(e => e.uid === lesson.post_author).fellow !== undefined
          ) {
            return true;
          }
        });
        console.log("staff only");
      } else if (!this.state.staffOnly) {
        mainLessons = mainLessons.filter(
          lesson => lesson.post_status === "publish"
        );
      }


      if (this.state.checkContent) {
        if (lessons) {
          let keywords = this.state.keywords.toLowerCase();

          listOfLessons = mainLessons.filter(
            lesson =>
              (lesson.post_title &&
                lesson.post_title.toLowerCase().includes(keywords) &&
                lesson.Subjects.includes(this.state.subject) &&
                lesson.Grade.includes(this.state.grade)) ||
              (lesson["closure"] &&
                lesson["closure"].toLowerCase().includes(keywords) &&
                lesson.Subjects.includes(this.state.subject) &&
                lesson.Grade.includes(this.state.grade)) ||
              (lesson["direct_instruction"] &&
                lesson["direct_instruction"].toLowerCase().includes(keywords) &&
                lesson.Subjects.includes(this.state.subject) &&
                lesson.Grade.includes(this.state.grade)) ||
              (lesson["guided_practice"] &&
                lesson["guided_practice"].toLowerCase().includes(keywords) &&
                lesson.Subjects.includes(this.state.subject) &&
                lesson.Grade.includes(this.state.grade)) ||
              (lesson["hook"] &&
                lesson["hook"].toLowerCase().includes(keywords) &&
                lesson.Subjects.includes(this.state.subject) &&
                lesson.Grade.includes(this.state.grade)) ||
              (lesson["learning_goals"] &&
                lesson["learning_goals"].toLowerCase().includes(keywords) &&
                lesson.Subjects.includes(this.state.subject) &&
                lesson.Grade.includes(this.state.grade)) ||
              (lesson["materials"] &&
                lesson["materials"].toLowerCase().includes(keywords) &&
                lesson.Subjects.includes(this.state.subject) &&
                lesson.Grade.includes(this.state.grade)) ||
              (lesson["notes"] &&
                lesson["notes"].toLowerCase().includes(keywords) &&
                lesson.Subjects.includes(this.state.subject) &&
                lesson.Grade.includes(this.state.grade)) ||
              (lesson["rationale"] &&
                lesson["rationale"].toLowerCase().includes(keywords) &&
                lesson.Subjects.includes(this.state.subject) &&
                lesson.Grade.includes(this.state.grade)) ||
              (lesson["standards"] &&
                lesson["standards"].toLowerCase().includes(keywords) &&
                lesson.Subjects.includes(this.state.subject) &&
                lesson.Grade.includes(this.state.grade))
          );
        }
      } else {
        if (lessons && lessons.length > 0 && users && users.length > 0) {
          listOfLessons = mainLessons.filter(lesson => {
            let name = "Loading...";
            let keywords = this.state.keywords.toLowerCase();

            if (users.find(e => e.uid === lesson.post_author)) {
              console.log("Found this shit")
              name = users
                .find(e => e.uid === lesson.post_author)
                .name.toLowerCase();
            }

            return (
              (lesson.post_status === "publish" &&
                name.includes(keywords) &&
                lesson.Subjects.includes(this.state.subject) &&
                lesson.Grade.includes(this.state.grade)) ||
              (lesson.post_status === "publish" &&
                lesson.post_title.toLowerCase().includes(keywords) &&
                lesson.Subjects.includes(this.state.subject) &&
                lesson.Grade.includes(this.state.grade))
            );
          });
        }
      }
    }

    return (
      <div style={{ maxWidth: "1400px", padding: "40px", margin: "auto" }}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={3}>
            <div className={classes.sticky}>
              <Paper
                className={classes.paper}
                style={{
                  paddingTop: "20px",
                  paddingBottom: "20px",
                  textAlign: "center"
                }}
                elevation={1}
              >
                <Link to={"/createlesson"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    className={classes.orange}
                    style={{ width: "90%" }}
                  >
                    Create Lesson
                  </Button>
                </Link>
                <Link to={"/dashboard"} style={{ textDecoration: "none" }}>
                  <Button
                    variant="contained"
                    color="primary"
                    style={{ width: "90%", marginTop: "15px" }}
                  >
                    My Dashboard
                  </Button>
                </Link>
              </Paper>
              <Paper
                className={classes.paper}
                style={{ marginTop: 24 }}
                elevation={1}
              >
                <Typography variant="h5" style={{ marginBottom: "5px" }}>
                  Search
                </Typography>
                <TextField
                  id="keywords"
                  label="Keywords"
                  className={classes.textField}
                  value={this.state.keywords}
                  onChange={this.handleChange("keywords")}
                  margin="dense"
                  variant="outlined"
                  placeholder="Beginner Science Project"
                />
                
                <TextField
                  id="grades"
                  label="Grade Level"
                  className={classes.textField}
                  value={this.state.grade}
                  onChange={this.handleChange("grade")}
                  margin="dense"
                  variant="outlined"
                  select
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {gradeLevel.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="subjects"
                  label="Subject"
                  className={classes.textField}
                  value={this.state.subject}
                  onChange={this.handleChange("subject")}
                  margin="dense"
                  variant="outlined"
                  select
                  SelectProps={{
                    MenuProps: {
                      className: classes.menu
                    }
                  }}
                >
                  {subjectList.map(option => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
                <Divider style={{marginTop: 20, marginBottom: 10}} />
                <Checkbox onChange={this.handleCheck} /> Check through content.
                <br />
                <Checkbox
                  onChange={this.handleOnlyStaff}
                  checked={this.state.staffOnly}
                /> Sponsored Lesson Plans.
                
                <br />
                <Checkbox
                  onChange={this.handleOnlyFavorite}
                  checked={this.state.favoritesOnly}
                /> Only show favorites.
                
                <Divider style={{ marginTop: 10, marginBottom: 15 }} />
                <div style={{ display: "flex", flexDirection: "row" }}>
                  <SvgIcon
                    style={{
                      textAlign: "right",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 70,
                      color: "gold"
                    }}
                  >
                    <path d="M9 11.3l3.71 2.7-1.42-4.36L15 7h-4.55L9 2.5 7.55 7H3l3.71 2.64L5.29 14z" />
                  </SvgIcon>
                  <Typography variant="body2" style={{ marginTop: 15 }}>
                    {" "}
                    = Created by Owner
                  </Typography>
                </div>
              </Paper>
            </div>
          </Grid>

          <EachLesson
            listOfLessons={listOfLessons}
            classes={classes}
            loading={loading}
            lessons={lessons}
            users={users}
            subjectList={subjectList}
            gradeLevel={gradeLevel}
            handleFavorite={this.handleFavorite}
            disabledFav={this.state.disabledFav}
          />
        </Grid>
      </div>
    );
  }
}

export default compose(
  connect((state, props) => ({
    lessons: state.firestore.ordered.lessons,
    users: state.firestore.ordered.users
  }))
)(withStyles(styles)(SearchLessons));
