import React, { Component } from "react"
import { Link, withRouter } from "react-router-dom"

import clsx from "clsx"

import {
  withStyles,
  Drawer,
  AppBar,
  Toolbar,
  Avatar,
  MenuList,
  MenuItem,
  CssBaseline,
  Typography,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Icon,
  Button
} from "@material-ui/core"

import { compose } from "recompose"

import profilePic from "../assets/images/profilepic.jpg"

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: 36
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap"
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  button: {
    color: '#ffffff',
    fontWeight: 'bold',
    display: 'flex',
    marginLeft: "auto",
    justifyContent: 'flex-end'   
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1
    }
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3)
  },
  bold: {
    fontWeight: 600
  }
});

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
  }
  handleDrawerOpen = () => {
    this.setState({
      open: true
    });
  };

  handleDrawerClose = () => {
    this.setState({
      open: false
    });
  };
  handelClick = (props) => {
    localStorage.removeItem('token');
    this.props.logOut();
    this.props.history.push("/");
  }
  render() {
    
    const {
      classes,
      location: { pathname }
    } = this.props;
    const username = "Admin";

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: this.state.open
          })}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={this.handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: this.state.open
              })}
            >
              <Icon>menu</Icon>
            </IconButton>
            <Typography variant="h6" noWrap>
              {this.props.title}
            </Typography>

            {/* logout button */}
            <Button
              size="medium"
              className={classes.button}
              onClick={() => {this.handelClick()}}> 
                logout
            </Button>

          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: this.state.open,
            [classes.drawerClose]: !this.state.open
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: this.state.open,
              [classes.drawerClose]: !this.state.open
            })
          }}
          open={this.state.open}
        >
          <div className={classes.toolbar}>
            <Avatar
              alt="Admin"
              src={profilePic}
              className={classes.bigAvatar}
            />
            <Typography className={classes.bold}>{username}</Typography>
            <IconButton onClick={this.handleDrawerClose}>
              <Icon>chevron_left</Icon>
            </IconButton>
            
          </div>
          
          <Divider />

          <MenuList>
            {this.props.menuItems.map((item, index) => (
              <MenuItem
                key={index}
                component={Link}
                to={`/dashboard/${item.title.toLowerCase()}`}
                selected={`/${item.title.toLowerCase()}` === pathname}
              >
                <ListItemIcon>
                  <Icon>{item.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={item.title} />
              </MenuItem>
            ))}
          </MenuList>
        </Drawer>
        <main className={classes.content}>
          <div className={classes.toolbar} />
          {this.props.children}
        </main>
      </div>
    );
  }
}

export default compose(
  withRouter,
  withStyles(styles)
)(Layout);
