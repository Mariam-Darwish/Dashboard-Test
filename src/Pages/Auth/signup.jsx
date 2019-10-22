import React, { Component } from "react"
import { Link } from 'react-router-dom'

import { createStyles, withStyles } from "@material-ui/core/styles"
import {Card, Grid, TextField, CardHeader, CardActions, Button } from "@material-ui/core"

import axios from 'axios'

import BackGround from '../../assets/images/trade.jpeg'

const styles = theme => 
  createStyles({
  root: {
    padding: theme.spacing(3),
    margin: "auto",
    opacity:'.7'
  }, 
  image: {
    backgroundImage: `url(${BackGround})`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100vh'
  },
  button: {
    display: 'flex',
    flexDirection: 'column',
    justify: 'center',
    justifyContent: 'center'
  },
  link: {
    textAlign: 'center',
    textDecoration: 'none',
    float: 'right'
  }

});

class SignUp extends Component {

  constructor (){
    super();
    this.state = { 
      firstName: '',
      lastName: '',
      userName: '',
      email: '', 
      password: '',
      emailError: false,
      passwordError: false,
      serverData: 0
    }
    
    this.handleFirstNameChanged = this.handleFirstNameChanged.bind(this);
    this.handleLastNameChanged = this.handleLastNameChanged.bind(this);
    this.handleUserNameChanged = this.handleUserNameChanged.bind(this);
  }

  handleFirstNameChanged (event) {
    this.setState({firstName: event.target.value})
  }

  handleLastNameChanged (event) {
    this.setState({lastName: event.target.value})
  }
  
  handleUserNameChanged (event) {
    this.setState({userName: event.target.value})
  }

  emailOnChange = (event) => {
    const currentEmail = event.target.value
    this.setState({ email: currentEmail })
  
    const regex = new RegExp(/^([\w\-_.]+)@([\w]+)\.([\w]+)$/i)
      if (regex.test(currentEmail)) {
        this.setState({
          emailError: false,
        })
      } 
      else {
        this.setState({
          emailError: true,
        })
      }
  }
  
  passwordOnChange = (event) => {
    const password = event.target.value
    this.setState({ password })
  
    if (password.length >= 4) {
      this.setState({ passwordError: false })
    } 
    else {
      this.setState({ passwordError: true })
    }
  }
  
  //api call and submit the data on the onClick event
  handleSubmit = () => {
    const { firstName, lastName, userName, email, password } = this.state;
    const user = {
      name: `${firstName} ${lastName}`,
      userName: userName,
      email: email,
      password: password,
  }

  console.log('valoro user:', user);
    
  axios.post('register/', user)
    .then((response) => {
        console.log('response.data:', response)
        this.setState(
          {
            serverData: response.data
          }
        );

        if(this.state.serverData === "There is no user with such an email, Register instead?")
            {
          console.log('responsess', this.serverStatus)
              window.location = '/register'
            }
        else {
          window.location = '/'
        }
    })
  }

render(){ 
    
  const {
    emailError,
    passwordError,
  } = this.state  

  const { classes } =this.props;
  return (
    <Grid container className={classes.image}>
      <Grid item md= {6} sm={8} xs={12} style={{margin: 'auto'}}>
      <Card className={classes.root}>
        <CardHeader title="Register Form" />
        <form >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={this.handleFirstNameChanged}
                  value={this.state.firstName}
                />
              </Grid>
  
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  autoComplete="lname"
                  onChange={this.handleLastNameChanged}
                  value={this.state.lastName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField 
                  error={emailError}
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  type="email"
                  autoComplete="email"
                  onChange={this.emailOnChange}
                  value={this.state.email}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="userName"
                  label="User Name"
                  autoComplete="UserName"
                  onChange={this.handleUserNameChanged}
                  value={this.state.userName}
                />
              </Grid>
  
              <Grid item xs={12}>
                <TextField
                  error={passwordError}
                  variant="outlined"
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.passwordOnChange}
                  value={this.state.passWord}
                />
              </Grid>
            </Grid>
  
            <CardActions disableSpacing>
              <Button
                variant="contained"
                fullWidth
                color="secondary"
                className={classes.button}
                component={Link} to="/"
              >
                Submit
              </Button>
        </CardActions> 
  
            <Grid container justify="center">
              <Grid item  style={{ margin: '10px 0px 2px'}}>
                <Link to="/" variant="body2" className={classes.link}>
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
      </Card>
      </Grid>
    </Grid>
  );
 }
}

export default withStyles(styles)(SignUp)