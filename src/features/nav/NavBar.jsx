import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import SvgIcon from "@material-ui/core/SvgIcon";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import PropTypes from "prop-types";
import { Button } from "@material-ui/core";
import Dog from "../../dog.jpg";
import { NavLink } from "react-router-dom";
import bgPhoto from '../../bg.jpg';

const mapState = state => ({
  auth: state.firebase.auth,
  profile: state.firebase.profile
});

const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  orange: {
    color: "white",
    minWidth: 100,
    backgroundColor: "#f37949",
    "&:hover": {
      backgroundColor: "#aa5433"
    }
  }
};

class NavBar extends Component {
  static contextTypes = {
    store: PropTypes.object.isRequired
  };

  state = {
    left: false,
    userDropdown: {
      open: false,
      anchor: null
    },
    user: {
      profilePhoto: Dog
    }
  };

  handleLogout = () => {
    const { firebase } = this.context.store;
    firebase
      .auth()
      .signOut()
      .then(function() {
        console.log("User Signed Out");
      })
      .catch(function(error) {
        console.log(error.message);
      });
  };

  handleUserDropdown = event => {
    this.setState({
      userDropdown: {
        open: this.state.userDropdown.open ? false : true,
        anchor: this.state.userDropdown.anchor ? null : event.currentTarget
      }
    });
  };

  toggleDrawer = (side, open) => () => {
    this.setState({
      [side]: open
    });
  };

  render() {
    const { auth, classes, profile } = this.props;
    const authenticated = auth.isLoaded && !auth.isEmpty;
    const { user, userDropdown } = this.state;

    const sideList = (
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div
          style={{
            height: "150px",
            width: "100%",
            backgroundImage: `url(${bgPhoto})`,
            backgroundSize: "cover",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column"
          }}
        >
          <Typography
            variant="h5"
            style={{ color: "white", fontWeight: "700" }}
          >
            Company Name
          </Typography>
          <Typography
            variant="h6"
            style={{ color: "white", fontWeight: "400" }}
          >
            Application
          </Typography>
        </div>
        <List>
          <Link to="/lessons" style={{textDecoration: 'none'}}>
            <ListItem button>
              <ListItemIcon>
                <SvgIcon>
                  <path d="M17 10H7v2h10v-2zm2-7h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zm-5-5H7v2h7v-2z" />
                </SvgIcon>
              </ListItemIcon>
              <ListItemText primary="Lesson Plans" />
            </ListItem>
          </Link>

        </List>
        <Divider />
        <List>
          <ListItem button>
            <ListItemIcon>
              <SvgIcon>
                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
              </SvgIcon>
            </ListItemIcon>
            <Link to="/createlesson" style={{textDecoration: 'none'}}>
              <ListItemText primary="Create a Lesson" />
            </Link>
          </ListItem>
        </List>
        <List style={{ position: "absolute", bottom: "0" }}>
        <NavLink
          style={{ width: '100%', color: "rgba(0, 0, 0, 0.87)" , textDecoration: 'none'}}
          to="/dashboard"
          >
          <ListItem button>
            <ListItemIcon>
              <SvgIcon>
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </SvgIcon>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          </NavLink>
        </List>
      </div>
    );

    return (
      <div className={classes.root}>
        <AppBar position="sticky">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
              onClick={this.toggleDrawer("left", true)}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              variant="h6"
              color="inherit"
              className={classes.grow}
              style={{ fontWeight: "400" }}
            >
              <Link to="/" style={{textDecoration: 'none', color: 'white'}}>
                {" "}
                <span style={{ color: "#f37949", fontWeight: "600" }}>
                  Company
                </span>{" "}
                Name
              </Link>
            </Typography>
            {authenticated && (
              <div>
                <IconButton color="inherit" onClick={this.handleUserDropdown}>
                  {user.profilePhoto ? (
                    <Avatar src={user.profilePhoto} />
                  ) : (
                    <AccountCircle style={{ fontSize: "30px" }} />
                  )}
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={userDropdown.anchor}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right"
                  }}
                  transformOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                  }}
                  onClose={this.handleUserDropdown}
                  open={userDropdown.open}
                  style={{ top: "48px" }}
                >
                  <MenuItem onClick={this.handleUserDropdown}>
                    <NavLink
                      style={{ color: "rgba(0, 0, 0, 0.87)" , textDecoration: 'none'}}
                      to="/dashboard"
                    >
                      Teacher Dashboard
                    </NavLink>
                  </MenuItem>

                  <MenuItem onClick={this.handleLogout}>Log Out</MenuItem>
                </Menu>
              </div>
            )}
            {!authenticated && (
              <Link to="/login" style={{textDecoration: 'none'}}>
                <Button variant="contained" className={classes.orange}>
                  Log In
                </Button>
              </Link>
            )}
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.state.left}
          onClose={this.toggleDrawer("left", false)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer("left", false)}
            onKeyDown={this.toggleDrawer("left", false)}
          >
            {sideList}
          </div>
        </Drawer>
      </div>
    );
  }
}

export default compose(
  connect(mapState),
  withStyles(styles)
)(NavBar);
