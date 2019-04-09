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
import { createLesson, saveLesson } from "../lessons/lessonActions";

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
    position: "absolute!important",
    zIndex: 100000,
    top: 15,
    right: 15,
    color: "white!important",
    fontWeight: 900,
    fontSize: "30px",
    cursor: "pointer",
    overflow: "visible"
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
  },
  resize: {
    fontSize: 18,
  }
});

class CreateLesson extends React.Component {
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
      customs: [{title: '', message: ''},{title: '', message: ''}]
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleCustomChange = this.handleCustomChange.bind(this);
    this.handleCustomTitleChange = this.handleCustomTitleChange.bind(this);
  }

  componentDidMount() {
    this.setState({
      authoruid: this.props.account.uid
    });

    console.log(Object.keys(this.state.customs));
  }

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
    let tobeDeleted = firebase
      .storage()
      .ref("images")
      .child(this.state.selectedFile);

    tobeDeleted
      .delete()
      .then(() => {
        console.log("File Deleted Successfully");
      })
      .catch(err => {
        console.log(err);
      });

    this.setState({
      selectedFile: null,
      progress: 0,
      isUploading: false,
      fileURL: null,
      selectedFileExt: ""
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);
    console.log(this.props.account);
    this.props.createLesson(this.state);
  };

  handleSave = e => {
    e.preventDefault();
    this.props.saveLesson(this.state);
  };

  handleAddSection = e => {
    e.preventDefault();
    let customs = this.state.customs;
    customs.push({title: '', message: ''});
    this.setState({customs})
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
    const { classes } = this.props;

    return (
      <div
        style={{ maxWidth: "1400px", padding: "40px", margin: "auto" }}
        className={classes.root}
      >
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
                      this.props.loading ||
                      this.props.finished ||
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
                    Publish
                    <CloudUploadIcon
                      className={classNames(
                        classes.rightIcon,
                        classes.iconSmall
                      )}
                    />
                  </Button>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={10}>
              <Paper className={classes.paper}>
                <div className={classes.basicInfo}>
                  <h1>Basic Lesson Details</h1>
                  <i style={{ fontSize: 11, marginTop: -17, marginBottom: 15 }}>
                    All of the fields in this section are required*.
                  </i>
                  <TextField
                    id="outlined-title"
                    label="Title"
                    className={classes.textField}
                    value={this.state.title}
                    onChange={this.handleTitleChange}
                    margin="normal"
                    variant="outlined"
                  />
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

                <h1>Learning Goals / Objectives</h1>
                <TextEditor
                  handleChange={this.handleChange}
                  field="learning_goals"
                />

                <h1>Standards</h1>
                <TextEditor
                  handleChange={this.handleChange}
                  field="standards"
                />

                <h1>Materials</h1>
                <TextEditor
                  handleChange={this.handleChange}
                  field="materials"
                />

                <h1>Direct Instruction</h1>
                <TextEditor
                  handleChange={this.handleChange}
                  field="direct_instruction"
                />

                <h1>Guided Practice</h1>
                <TextEditor
                  handleChange={this.handleChange}
                  field="guided_practice"
                />

                <h1>Assessment / Check Understanding</h1>
                <TextEditor handleChange={this.handleChange} field="closure" />

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
      </div>
    );
  }
}

function TextEditor({ handleChange, field }) {
  return (
    <TinyMCE
      content=""
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
    createLesson: lesson => dispatch(createLesson(lesson)),
    saveLesson: lesson => dispatch(saveLesson(lesson))
  };
};

const mapStateToProps = state => {
  return {
    loading: state.create.loading,
    finished: state.create.finishedPosting,
    account: state.firebase.auth
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateLesson));
