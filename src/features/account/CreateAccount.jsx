import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { createAccount } from "./authActions";
import {
  Paper,
  Avatar,
  Typography,
  Button,
  FormControl,
  Input,
  InputLabel,
  Grid
} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import LockIcon from "@material-ui/icons/LockOutlined";

const styles = theme => ({
  main: {
    width: "auto",
    display: "block", // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: '90%',
    margin: 'auto',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: "#f37949"
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing.unit
  },
  submit: {
    marginTop: theme.spacing.unit * 3
  }
});

class CreateAccount extends React.Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    errorMessage: null,
    open: true
  };

  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state);

    this.props.createAccount(this.state);
  };

  handleChangeEmail = e => {
    this.setState({
      email: e.target.value
    });
  };
  handleChangePassword = e => {
    this.setState({
      password: e.target.value
    });
  };

  handleChangeFirstName = e => {
    this.setState({
      firstName: e.target.value
    });
  }
  handleChangeLastName = e => {
    this.setState({
      lastName: e.target.value
    });
  }

  render() {
    if (this.props.loggedIn) {
      window.location.href = "/lessons";
    }

    const { classes } = this.props;
    return (
      
      <div className={classes.root} style={{ maxWidth: 800, margin: "auto" }}>
      <Grid item>
        <Paper className={classes.paper} spacing={24}>
          <Avatar className={classes.avatar}>
            <LockIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Create Account
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="firstName">First Name</InputLabel>
              <Input
                id="firstName"
                name="firstName"
                autoComplete="firstName"
                autoFocus
                onChange={this.handleChangeFirstName}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input
                id="lastName"
                name="lastName"
                autoComplete="lastName"
                autoFocus
                onChange={this.handleChangeLastName}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChangeEmail}
              />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input
                name="password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChangePassword}
              />
            </FormControl>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={this.props.loading /* || !(this.state.email.includes('@psusd.us') || this.state.email.includes('@desertsands') || this.state.email.includes('@dsusd') || this.state.email.includes('@digicomlearning' ))*/}
            >
              Create Account
            </Button>
            <center><i style={{textAlign: 'center', width:'100%'}}>Email Domain Restriction is currently disabled.</i></center>
          </form>
        </Paper></Grid>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createAccount: creds => dispatch(createAccount(creds))
  };
};

const mapStateToProps = state => {
  return {
    authError: state.auth.authError,
    loggedIn: state.auth.loggedIn,
    loading: state.auth.loading,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(CreateAccount));
