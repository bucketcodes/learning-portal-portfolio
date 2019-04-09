import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";
import logo from '../../logo2.svg'

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class Home extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div
        style={{ opacity: "0.75", display: "flex", justifyContent: "center" }}
      >
        <Grid
          style={{
            alignContent: "center",
            justifyContent: "center",
            maxWidth: "400px",
            marginTop: "15vmin"
          }}
          container
          spacing={24}
        >
          <Grid item xs={12} style={{ opacity: "0.6" }}>
            <img
              alt="DIGICOM Learning Logo"
              style={{ width: "100%" }}
              src={logo}
            />
            <Typography
              style={{ textAlign: "center" }}
              variant="h6"
              color="inherit"
            >
              Welcome to the <b>Company Name</b> Portal!
            </Typography>
            <Typography
              style={{ textAlign: "center" }}
              variant="p"
              color="inherit"
            >
              This is a slice of an application built for a non-profit named DIGICOM Learning.
            </Typography>
          </Grid>
          
          <Grid item xs={12}>
            <Link to="/lessons" style={{textDecoration: 'none'}}>
              <Button
                style={{ width: "100%" }}
                size="large"
                className={classes.button}
                variant="contained"
              >
                Lesson Plans
              </Button>
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Home);
