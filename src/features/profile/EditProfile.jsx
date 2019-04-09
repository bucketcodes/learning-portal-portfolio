import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Grid, Paper, Typography, Divider, Button } from "@material-ui/core";


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

export class EditProfile extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  render() {
    const {classes} = this.props;
    return (
      <div
        style={{ maxWidth: "1400px", padding: "40px", margin: "auto" }}
        className={classes.root}
      >
      <Grid container spacing={24}>
      <Grid item xs={3}>
        Hello World
      </Grid>
      <Grid item xs={9}>
        Hello World 2
      </Grid>

      </Grid>
      
      </div>
    );
  }
}

const mapState = state => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapState)(withStyles(styles)(EditProfile));
