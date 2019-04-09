import React from "react";
import TinyMCE from "react-tinymce";
import {
  Grid,
  Card,
  Paper,
  CardMedia,
  Typography,
  Divider,
  CardContent,
  Button
} from "@material-ui/core";
import dog from "../../dog.jpg";
import { withStyles } from "@material-ui/core/styles";
import SaveIcon from "@material-ui/icons/Save";
import classNames from "classnames";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import firebase from "firebase";
import TextField from "@material-ui/core/TextField";
import { subjectList, periodList, gradeLevel } from "../../app/const/selectors";
import MenuItem from "@material-ui/core/MenuItem";
import CreateTopObject from "./CreateTopObject";
import { connect } from "react-redux";
import { updateLesson, saveLesson, deleteLesson } from "../lessons/lessonActions";
import PropTypes from "prop-types";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  iconSmall: {
    fontSize: 20
  },
  card: {
    position: "sticky!important",
    top: 20
  },
  cancel: {
    position: "absolute",
    zIndex: 10000,
    top: 15,
    right: 15,
    color: "white",
    fontWeight: 900,
    fontSize: "30px",
    cursor: "pointer"
  },
  textField: {
    marginTop: 0,
    width: "100%"
  },
  basicInfo: {
    display: "flex!important",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    width: "100%"
  },
  selector: {
    width: "30%"
  },
  selectorWrapper: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between"
  }
});

class EditLesson extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedFile: null,
      fileURL: null,
      progress: 0,
      isUploading: false,
      selectedFileExt: null,
      title: "",
      subject: "",
      grade: "",
      period: "",
      authenticated: null,
      doc: null,
      open: false
    };

    this.handleChange = this.handleChange.bind(this);
  }

  async componentDidMount() {
    const { firestore } = this.context.store;
    await firestore.get({
      collection: "lessons",
      doc: this.props.match.params.id
    });

    this.setState({
      doc: this.props.match.params.id
    });

    if (this.props.lesson[0].post_author === this.props.account.uid) {
      this.setState({
        authenticated: true
      });
    } else {
      this.setState({
        authenticated: false
      });
    }

    this.setState(this.props.lesson[0]);

    if (this.props.lesson[0].post_title) {
      this.setState({
        title: this.props.lesson[0].post_title
      });
    }

    if (this.props.lesson[0].file1) {
      this.setState({
        fileURL: this.props.lesson[0].file1,
        progress: 100,
        isUploading: false
      });
    }

    if (this.props.lesson[0].Subjects) {
      this.setState({
        subject: this.props.lesson[0].Subjects
      });
    }

    if (this.props.lesson[0].Grade) {
      this.setState({
        grade: this.props.lesson[0].Grade
      });
    }

    if (this.props.lesson[0].Period) {
      this.setState({
        period: this.props.lesson[0].Period
      });
    }

    if (
      this.props.lesson[0].file1 &&
      this.props.lesson[0].file1
        .slice(((this.props.lesson[0].file1.lastIndexOf(".") - 1) >>> 0) + 2)
        .includes("jpg" || "png")
    ) {
      this.setState({
        selectedFileExt: "image"
      });
    } else {
      console.log("Not an image");
    }
    if (
      this.props.lesson[0].file1 &&
      this.props.lesson[0].file1
        .slice(((this.props.lesson[0].file1.lastIndexOf(".") - 1) >>> 0) + 2)
        .includes("mp4" || "mov")
    ) {
      this.setState({
        selectedFileExt: "video"
      });
    } else {
      console.log("Not an video");
    }
    this.setState({
      finished: false
    });
    // if(this.state.authoruid !== this.props.lesson)
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleTitleChange = e => {
    this.setState({
      title: e.target.value
    });
  };
  handleSubjectChange = e => {
    this.setState({
      subject: e.target.value
    });
  };
  handleGradeChange = e => {
    this.setState({
      grade: e.target.value
    });
  };
  handlePeriodChange = e => {
    this.setState({
      period: e.target.value
    });
  };

  handleChange(e, field) {
    this.setState({ [field]: e.target.getContent() });
  }

  handleUploadStart = () => {
    this.setState({ isUploading: true, progress: 0 });
  };
  handleProgress = progress => this.setState({ progress });

  handleUploadError = error => {
    this.setState({ isUploading: false });
    console.error(error);
  };
  handleUploadSuccess = filename => {
    this.setState({
      selectedFile: filename,
      progress: 100,
      isUploading: false
    });

    let fileExt = this.state.selectedFile.slice(
      ((this.state.selectedFile.lastIndexOf(".") - 1) >>> 0) + 2
    );

    if (fileExt === "jpg" || fileExt === "png") {
      this.setState({ selectedFileExt: "image" });
    }

    if (fileExt === "mov" || fileExt === "mp4") {
      this.setState({ selectedFileExt: "video" });
    }

    firebase
      .storage()
      .ref("images")
      .child(filename)
      .getDownloadURL()
      .then(url => this.setState({ fileURL: url }));
  };
  handleReset = () => {
    let tobeDeleted = firebase.storage().refFromURL(this.state.fileURL);

    tobeDeleted
      .delete()
      .then(() => {
        console.log("File Deleted Successfully");
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      fileURL: null,
      progress: 0,
      isUploading: false,
      file1: null,
      selectedFileExt: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    console.log(this.props.account);
    this.props.updateLesson(this.state);
  };

  handleSave = e => {
    e.preventDefault();
    this.props.saveLesson(this.state);
  };

  deleteLesson = e => {
    e.preventDefault();
    this.props.deleteLesson(this.state)
  }
  handleCustomChange(index, e) {
    let customs = this.state.customs

    customs[index].message = e.target.getContent();
    this.setState({
      customs
    });
  }
  handleCustomTitleChange = (index, e) => {
    let customs = this.state.customs
    
    customs[index].title = e.target.value
    this.setState({
      customs
    });
  };
  handleAddSection = e => {
    e.preventDefault();
    if (this.state.customs){
      let customs = this.state.customs;
      customs.push({title: '', message: ''});
      this.setState({customs})
    } else {
      let customs=[];
      customs.push({title: '', message: ''});
      this.setState({customs})
    }
    
    
  };

  deleteSection = (section) => {
    let oldcustoms = this.state.customs;
    delete oldcustoms[section]
    let customs = oldcustoms.filter(x => x !== null);
    this.setState({
      customs
    })

  }

  render() {
    const { classes, lesson } = this.props;

    return (
      <div
        style={{ maxWidth: "1400px", padding: "40px", margin: "auto" }}
        className={classes.root}
      >
        {this.state.authenticated && (
          <form
            className={classes.root}
            onSubmit={this.handleSubmit}
            style={{ width: "100%", padding: 0, margin: 0 }}
          >
            <Grid container spacing={24}>
              <CreateTopObject
                selectedFileExt={this.state.selectedFileExt}
                styles={styles}
                classes={classes}
                fileURL={this.state.fileURL}
                handleProgress={this.handleProgress}
                isUploading={this.state.isUploading}
                progress={this.state.progress}
                handleReset={this.handleReset}
                selectedFile={this.state.selectedFile}
                handleUploadError={this.handleUploadError}
                handleUploadStart={this.handleUploadStart}
                handleUploadSuccess={this.handleUploadSuccess}
              />
              <Grid item xs={2}>
                <Card className={classes.card}>
                  <CardMedia
                    component="img"
                    alt="profile"
                    className={classes.profilePhoto}
                    image={
                      this.props.account.photoURL
                        ? this.props.account.photoURL
                        : dog
                    }
                    style={{ maxHeight: 160, objectFit: "cover" }}
                  />
                  <CardContent style={{ paddingBottom: 10 }}>
                    <Typography
                      align="center"
                      style={{ fontSize: 18, lineHeight: "18px" }}
                    >
                      {this.props.account.displayName
                        ? this.props.account.displayName
                        : "Loading..."}
                    </Typography>

                    <Divider
                      style={{ marginTop: "15px", marginBottom: "20px" }}
                    />
                    <Button style={{ width: "100%" }} variant="outlined">
                      Edit Profile
                    </Button>
                    <Divider
                      style={{ marginTop: "15px", marginBottom: "20px" }}
                    />
                    <Button
                      disabled={
                        this.state.loading ||
                        this.state.finished ||
                        !this.state.title
                      }
                      style={{ width: "100%" }}
                      variant="outlined"
                      onClick={this.handleSave}
                    >
                      Finish Later
                      <SaveIcon
                        className={classNames(
                          classes.rightIcon,
                          classes.iconSmall
                        )}
                      />
                    </Button>
                    <Button
                      disabled={
                        this.state.loading ||
                        this.state.finished ||
                        !(
                          this.state.grade &&
                          this.state.subject &&
                          this.state.period &&
                          this.state.title
                        )
                      }
                      variant="contained"
                      color="secondary"
                      type="submit"
                      style={{ width: "100%", marginTop: "10px" }}
                      onClick={this.handleSubmit}
                    >
                      {this.state.post_status &&
                      this.state.post_status === "publish"
                        ? "Update"
                        : "Publish"}
                      <CloudUploadIcon
                        className={classNames(
                          classes.rightIcon,
                          classes.iconSmall
                        )}
                      />
                    </Button>
                    <Divider
                      style={{ marginTop: "15px", marginBottom: "20px" }}
                    />
                    <Button
                      variant="outlined"
                      style={{ border: "1px solid red", color: "red", width: '100%' }}
                      onClick={this.handleClickOpen}
                    >
                      Delete Lesson
                    </Button>
                    <Dialog
                      open={this.state.open}
                      onClose={this.handleClose}
                      aria-labelledby="alert-dialog-title"
                      aria-describedby="alert-dialog-description"
                    >
                      <DialogTitle id="alert-dialog-title">
                        {"Are you sure you want to delete the lesson?"}
                      </DialogTitle>
                      <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                          Once the lesson is deleted, it will not be recoverable.
                        </DialogContentText>
                      </DialogContent>
                      <DialogActions>
                        <Button onClick={this.deleteLesson} color="primary">
                          Yes, Delete lesson
                        </Button>
                        <Button
                          onClick={this.handleClose}
                          color="primary"
                          autoFocus
                        >
                          Cancel
                        </Button>
                      </DialogActions>
                    </Dialog>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={10}>
                <Paper className={classes.paper}>
                  <div className={classes.basicInfo}>
                    <h1>Basic Lesson Details</h1>
                    <i
                      style={{ fontSize: 11, marginTop: -17, marginBottom: 15 }}
                    >
                      All of the fields in this section are required*.
                    </i>
                    {this.state.post_title && (
                      <TextField
                        id="outlined-title"
                        label="Title"
                        className={classes.textField}
                        value={this.state.title}
                        onChange={this.handleTitleChange}
                        margin="normal"
                        variant="outlined"
                      />
                    )}
                    <div className={classes.selectorWrapper}>
                      <TextField
                        id="outlined-select-subject"
                        select
                        label="Subject"
                        className={classes.selector}
                        value={this.state.subject}
                        onChange={this.handleSubjectChange}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                        margin="normal"
                        variant="outlined"
                      >
                        {subjectList.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="outlined-select-grade"
                        select
                        label="Grade Level"
                        className={classes.selector}
                        value={this.state.grade}
                        onChange={this.handleGradeChange}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                        margin="normal"
                        variant="outlined"
                      >
                        {gradeLevel.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                      <TextField
                        id="outlined-select-period"
                        select
                        label="Period Length"
                        className={classes.selector}
                        value={this.state.period}
                        onChange={this.handlePeriodChange}
                        SelectProps={{
                          MenuProps: {
                            className: classes.menu
                          }
                        }}
                        margin="normal"
                        variant="outlined"
                      >
                        {periodList.map(option => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                  </div>

                  <Divider style={{ marginTop: 40, marginBottom: 30 }} />
                  {lesson && lesson[0] && lesson[0].rationale && (<div>
                  <h1>Rationale</h1>
                  
                    <TextEditor
                      handleChange={this.handleChange}
                      field="rationale"
                      content={lesson[0].rationale}
                    />
                  </div>)}

                  <h1>Learning Goals / Objectives</h1>
                  {lesson && lesson[0] && lesson[0].learning_goals && (
                    <TextEditor
                      handleChange={this.handleChange}
                      field="learning_goals"
                      content={lesson[0].learning_goals}
                    />
                  )}
                  {lesson && lesson[0] && !lesson[0].learning_goals && (
                    <TextEditor
                      handleChange={this.handleChange}
                      field="learning_goals"
                    />
                  )}

                  <h1>Standards</h1>
                  {lesson && lesson[0] && lesson[0].standards && (
                    <TextEditor
                      handleChange={this.handleChange}
                      field="standards"
                      content={lesson[0].standards}
                    />
                  )}
                  {lesson && lesson[0] && !lesson[0].standards && (
                    <TextEditor
                      handleChange={this.handleChange}
                      field="standards"
                    />
                  )}

                  <h1>Materials</h1>
                  {lesson && lesson[0] && lesson[0].materials && (
                    <TextEditor
                      handleChange={this.handleChange}
                      field="materials"
                      content={lesson[0].materials}
                    />
                  )}
                  {lesson && lesson[0] && !lesson[0].materials && (
                    <TextEditor
                      handleChange={this.handleChange}
                      field="materials"
                    />
                  )}
                  {lesson && lesson[0] && lesson[0].hook && (<div>
                  <h1>Anticipatory Set / Hook</h1>
                  
                    <TextEditor
                      handleChange={this.handleChange}
                      field="hook"
                      content={lesson[0].hook}
                    />
                  </div>)}
                 

                  <h1>Direct Instruction</h1>
                  {lesson && lesson[0] && lesson[0].direct_instruction && (
                    <TextEditor
                      handleChange={this.handleChange}
                      field="direct_instruction"
                      content={lesson[0].direct_instruction}
                    />
                  )}
                  {lesson && lesson[0] && !lesson[0].direct_instruction && (
                    <TextEditor
                      handleChange={this.handleChange}
                      field="direct_instruction"
                    />
                  )}

                  <h1>Guided Practice</h1>
                  {lesson && lesson[0] && lesson[0].guided_practice && (
                    <TextEditor
                      handleChange={this.handleChange}
                      field="guided_practice"
                      content={lesson[0].guided_practice}
                    />
                  )}
                  {lesson && lesson[0] && !lesson[0].guided_practice && (
                    <TextEditor
                      handleChange={this.handleChange}
                      field="guided_practice"
                    />
                  )}

                  <h1>Assessment / Check Understanding</h1>
                  {lesson && lesson[0] && lesson[0].closure && (
                    <TextEditor
                      handleChange={this.handleChange}
                      field="closure"
                      content={lesson[0].closure}
                    />
                  )}
                  {lesson && lesson[0] && !lesson[0].closure && (
                    <TextEditor
                      handleChange={this.handleChange}
                      field="closure"
                    />
                  )}
                  {lesson && lesson[0] && lesson[0].notes && (<div>
                  <h1>Notes</h1>
                  
                    <TextEditor
                      handleChange={this.handleChange}
                      field="notes"
                      content={lesson[0].notes}
                    />
                  </div>)}
                  
                  {this.state.customs &&
                  this.state.customs.map((custom) => (
                    <div key={this.state.customs.indexOf(custom)}>
                      <TextField
                        id="outlined-custom-title"
                        label="Section Title"
                        className={classes.textField}
                        value={this.state.customs[this.state.customs.indexOf(custom)].title}
                        onChange={e => this.handleCustomTitleChange(this.state.customs.indexOf(custom), e)}
                        margin="normal"
                        InputProps={{
                          classes: {
                            input: classes.resize,
                          },
                        }}
                        variant="outlined"
                        style={{ marginTop: 30 }}
                      />
                      <TextEditor
                        handleChange={(e) => this.handleCustomChange(this.state.customs.indexOf(custom), e)}
                        field={custom}
                        content={this.state.customs[this.state.customs.indexOf(custom)].message}
                      />
                      <Button onClick={() => this.deleteSection(this.state.customs.indexOf(custom))} style={{marginTop: 8}} variant='outlined' size='small'>Delete Section</Button>
                    </div>
                  ))}
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleAddSection}
                  style={{marginTop: 15}}
                >
                  Add Section
                </Button>
                </Paper>
              </Grid>
            </Grid>
          </form>
        )}
        {this.state.authenticated === false && (
          <div>
            You are not authorized to edit the post.
            <br />
            Did we make a mistake?
            <br />
            <br />
            Email us at: tlentz@digicomlearning.com
          </div>
        )}
      </div>
    );
  }
}

function TextEditor({ handleChange, field, content }) {
  return (
    <TinyMCE
      content={content ? content : ""}
      config={{
        table_default_styles: {
          width: "50%"
        },
        textpattern_patterns: [
          {
            start: "//win",
            replacement: "Developped by the allmighty Tim Lentz! <3"
          },
          {
            start: "//jesse",
            replacement: "Someone please get Jesse to learn ReactJS"
          },
          {
            start: "//roll",
            replacement:
              '<p><iframe src="//www.youtube.com/embed/dQw4w9WgXcQ" width="560" height="314" allowfullscreen="allowfullscreen"></iframe></p>'
          }
        ],
        plugins:
          "media autolink link image lists print preview imagetools link table paste textpattern textcolor autoresize",
        menubar: false,
        branding: false,
        media_live_embeds: true,
        statusbar: false,
        autoresize_bottom_margin: 20,
        textcolor_map: [
          "f69c79",
          "DIGICOM Orange",
          "97b8d5",
          "DIGICOM Blue",
          "f2f2f2",
          "DIGICOM Grey",
          "fffd8d",
          "Yellow"
        ],
        toolbar:
          "formatselect | undo redo | bold italic backcolor | alignleft aligncenter alignright | bullist numlist outdent indent | table | link image media "
      }}
      onChange={e => handleChange(e, field)}
    />
  );
}

const mapDispatchToProps = dispatch => {
  return {
    updateLesson: lesson => dispatch(updateLesson(lesson)),
    saveLesson: lesson => dispatch(saveLesson(lesson)),
    deleteLesson: lesson => dispatch(deleteLesson(lesson))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.create.loading,
    finished: state.create.finishedPosting,
    account: state.firebase.auth,
    lesson: state.firestore.ordered.lessons
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(EditLesson));
