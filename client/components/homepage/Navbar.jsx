import React from 'react';
import { Link } from 'react-router-dom';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import InputBase from '@material-ui/core/InputBase';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MailIcon from '@material-ui/icons/Mail';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MoreIcon from '@material-ui/icons/MoreVert';
import Authentication from '../authentication/Authentication.jsx'
import logo from '"../../../dist/InterMingle.png'
const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    marginRight: theme.spacing(20),
    color: theme.palette.text,
  },
  intro: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    color: theme.palette.text,
    paddingLeft: theme.spacing(10),
    marginTop: theme.spacing(1),
    '&:hover': {
      backgroundColor: 'transparent',
    },
    color: theme.palette.text,
  },
  logo: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
    '&:hover': {
      backgroundColor: 'transparent',
    },
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
}));

export default function Navbar(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
  const [login, setLogin] = React.useState(1);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem component={Link} to={'/profile'} onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem component={Link} to={'/'} onClick={() => {handleMenuClose(); props.setUser({});}}>Log Out</MenuItem>
    </Menu>
  );

  //if username exists (is not undefined) return a fully functioning navbar
  if (props.user.username) {
    return (
      <div className={classes.grow}>
         <Button component={Link} to={'/'} className={classes.logo} variant="h6" style={{ textDecoration: 'none'}}>
          <img src = {logo} style = {{height:'15%', width:'15%'}} ></img>
          </Button>
      <AppBar position="static" style = {{marginBottom:'20px', background: 'transparent', boxShadow: 'none'}}>
        <Toolbar>


          <Button component={Link} to={'/quizzes'} className={classes.title} variant="h6" style={{ textDecoration: 'none'}}>
            Quizzes/Categories

          </Button>
          <Button component={Link} to={'/create'} className={classes.title} variant="h6" style={{ textDecoration: 'none', marginLeft:'300px'}}>
            Create A Quiz
          </Button>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <div style={{display:'flex', flexDirection:'row'}}>

              <Button
              className={classes.intro}
              variant="h6"
              style={{ textDecoration: 'none'}}
              onClick={handleProfileMenuOpen}
              >
              Hello, {props.user.username}!
              </Button>
              <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              >
              <AccountCircle  />
              </IconButton>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
    );
  }
  //otherwise return a navbar where all the links just open up the login modal, except the home button, which can stay the same
  return (
    <div className={classes.grow}>
      <Button component={Link} to={'/'} className={classes.logo} variant="h6" style={{ textDecoration: 'none'}}>
          <img src = {logo} style = {{height:'15%', width:'15%'}} ></img>
          </Button>
    <AppBar position="static" style = {{marginBottom:'20px', background: 'transparent', boxShadow: 'none'}}>
      <Toolbar>
        <Button onClick={() => {props.setLoginOpen(true)}} className={classes.title} variant="h6" style={{ textDecoration: 'none'}} >
          Quizzes/Categories
        </Button>

        <Button onClick={() => {props.setLoginOpen(true)}} className={classes.title} variant="h6" style={{ textDecoration: 'none', marginLeft:'300px'}} >
          Create A Quiz
        </Button>

        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <Authentication setUser={props.setUser} loginOpen={props.loginOpen} setLoginOpen={props.setLoginOpen}/>
        </div>
      </Toolbar>
    </AppBar>
    {renderMenu}
  </div>
  );
}