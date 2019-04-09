import React, { Component } from "react";
import {
  Grid,
  Paper,
  Typography,
  Button,
  SvgIcon,
  TextField
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import FlipMove from "react-flip-move";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { compose } from "redux";

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit
  },
  linkpaper: {
    paddingTop: 15,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",
    width: "100%"
  },
  documentPaper: {
    padding: theme.spacing.unit,
    display: "flex",
    alignItems: "center",
    marginBottom: 70,
    width: "100%" - 25,
    marginLeft: 25
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
  },
  documentImage: {
    width: "50%",
    marginLeft: -30,
    marginTop: -30,
    marginBottom: -30,
    borderRadius: 6,
    objectFit: "cover",
    height: 220,
    boxShadow: "2px 2px 4px rgba(50,50,50,0.4)"
  },
  documentText: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    marginLeft: 30,
    width: "50%"
  },
  title: {
    textAlign: "center"
  },
  linkDiv: {
    marginBottom: 30,
    borderRadius: 6,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: 230,
    height: 230
  }
});

export class Resources extends Component {
  state = {
    keywords: ""
  };

  handleChange = (field, e) => {
    this.setState({ [field]: e.target.value.toLowerCase() });
  };

  render() {
    let { classes } = this.props;

    let docList;
    let linkList;

    if (this.props.documents && this.props.links) {
      docList = this.props.documents.filter(
        e =>
          e.title.toLowerCase().includes(this.state.keywords) ||
          e.description.toLowerCase().includes(this.state.keywords)
      );
      linkList = this.props.links.filter(e =>
        e.title.toLowerCase().includes(this.state.keywords)
      );
    }

    return (
      <div style={{ maxWidth: "1400px", padding: "40px", margin: "auto" }}>
        <Grid container spacing={24}>
          <Grid item xs={12} style={{ marginBottom: 40 }}>
            <Typography style={{ textAlign: "center" }} variant="h4">
              Search
            </Typography>
            <Paper className={classes.paper}>
              <TextField
                id="keywords"
                label="Search"
                className={classes.textField}
                value={this.state.keywords}
                onChange={e => this.handleChange("keywords", e)}
                margin="dense"
                variant="outlined"
                placeholder="Beginner Storyboard..."
              />
            </Paper>
          </Grid>
          {docList && docList.length !== 0 && (
            <Grid item xs={12} sm={12} md={linkList.length !== 0 ? 7 : 12}>
              <Typography
                className={classes.title}
                style={{ marginBottom: 35 }}
                variant="h3"
              >
                Document Downloads
              </Typography>
              <FlipMove>
                {docList &&
                  docList.map(document => (
                    <Paper className={classes.documentPaper} elevation={1}>
                      <img
                        className={classes.documentImage}
                        src={document.thumbnailURL}
                        alt={"testing"}
                      />
                      <div className={classes.documentText}>
                        <Typography style={{ fontWeight: 600, fontSize: 20 }}>
                          {document.title}
                        </Typography>
                        <Typography variant="p">
                          {document.description}
                        </Typography>
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "row",
                            justifyContent: "space-around",
                            alignItems: "center",
                            marginTop: 20,
                            width: "100%"
                          }}
                        >
                          <Button href={document.downloadURL} className={classes.orange}>Download</Button>
                          <SvgIcon style={{ color: "black" }}>
                            <path d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z" />
                          </SvgIcon>
                        </div>
                      </div>
                    </Paper>
                  ))}
              </FlipMove>
            </Grid>
          )}
          {linkList && linkList.length !== 0 && (
            <Grid item xs={12} sm={12} md={docList.length !== 0 ? 5 : 12}>
              <Typography className={classes.title} variant="h3">
                Links
              </Typography>
              <Paper
                style={{ minHeight: 600, marginTop: 25 }}
                className={classes.linkpaper}
                elevation={1}
              >
                <FlipMove className={classes.linkpaper}>
                  {linkList &&
                    linkList.map(link => (
                      <div
                        className={classes.linkDiv}
                        style={{ backgroundColor: "black", overflow: "hidden" }}
                      >
                        <img
                          src={link.thumbnailURL}
                          style={{
                            margin: 20,
                            opacity: 0.4,
                            backgroundPosition: "center",
                            top: 0,
                            left: 0,
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                          }}
                        />
                        <Typography
                          variant="display1"
                          style={{
                            color: "white",
                            textShadow: "2px 2px 4px rgba(50,50,50,0.4)",
                            zIndex: 9000,
                            maxWidth: 200,
                            textAlign: "center",
                            position: "absolute",
                            margin: "auto"
                          }}
                        >
                          {link.title}
                        </Typography>
                      </div>
                    ))}
                </FlipMove>
              </Paper>
            </Grid>
          )}
        </Grid>
      </div>
    );
  }
}
export default compose(
  firestoreConnect(["documents", "links"]),
  connect(state => ({
    documents: state.firestore.ordered.documents,
    links: state.firestore.ordered.links
  })),
  withStyles(styles)
)(Resources);
