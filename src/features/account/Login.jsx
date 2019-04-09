import React from "react";
import { connect } from "react-redux"
import PropTypes from 'prop-types'
import {signIn, fixIssues} from './authActions'
import { Paper, Avatar, Typography, Button, FormControl, Input, InputLabel, Divider } from "@material-ui/core";
import withStyles from '@material-ui/core/styles/withStyles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import LockIcon from '@material-ui/icons/LockOutlined';
import Checkbox from '@material-ui/core/Checkbox';
import {Link} from 'react-router-dom'


const styles = theme => ({
    main: {
      width: 'auto',
      display: 'block', // Fix IE 11 issue.
      marginLeft: theme.spacing.unit * 3,
      marginRight: theme.spacing.unit * 3,
      [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
        width: 400,
        marginLeft: 'auto',
        marginRight: 'auto',
      },
    },
    paper: {
      marginTop: theme.spacing.unit * 8,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      maxWidth: '90%',
      margin: 'auto',
      padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
    },
    avatar: {
      margin: theme.spacing.unit,
      backgroundColor: '#f37949',
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing.unit,
    },
    submit: {
      marginTop: theme.spacing.unit * 3,
    },
  });

class Login extends React.Component {

    static contextTypes = {
        store: PropTypes.object.isRequired
    }

    state = {
        email: '',
        password: '',
        errorMessage: null,
        open: true
    }


    handleSubmit = e => {
        e.preventDefault()
        console.log(this.state)

        this.props.signIn(this.state)

    }

    handleChangeEmail = e => {
        this.setState({
            email: e.target.value
        })
    }
    handleChangePassword = e => {
        this.setState({
            password: e.target.value
        })
    }

  render() {
    if(this.props.loggedIn){
        window.location.href = '/lessons'
    }

    const { classes } = this.props;
    return (
      <div className={classes.root} style={{maxWidth: 800, margin:'auto'}}>
        
        <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Typography component="p" variant="p">
          Please use username: <span style={{color: 'orange', fontWeight: 700}}>test@test.com</span> and password: <span style={{color: 'orange', fontWeight: 700}}>Oranges123</span> to try out the application.
        </Typography>
        <form className={classes.form} onSubmit={this.handleSubmit}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" autoFocus onChange={this.handleChangeEmail}/>
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChangePassword}/>
          </FormControl>
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={this.props.loading || !(this.state.email && this.state.password)}
          >
            Sign in
          </Button>

          <Divider />

          <div style={{marginTop: '40px', width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
            <Typography style={{fontSize: 14, fontWeight: 300, textAlign: 'center'}}>
              Don't have an account?
            </Typography>
            <Link to='/createaccount' style={{maxWidth: 200, margin:'auto', textDecoration: 'none'}}><Button variant='outlined' >Create Account</Button></Link>
          </div>
          
        </form>
      </Paper>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
    return {
        signIn: (creds) => dispatch(signIn(creds)),
        fixIssues: () => dispatch(fixIssues())
    }
}

const mapStateToProps = (state) => {
    return {
        authError: state.auth.authError,
        loggedIn: state.auth.loggedIn,
        loading: state.auth.loading
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Login))