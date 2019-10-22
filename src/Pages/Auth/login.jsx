import React, {Component} from "react"
import { Link } from 'react-router-dom'

import { Card, TextField, CardHeader, Button, Grid, FormControlLabel, Checkbox } from "@material-ui/core"
import { createStyles, withStyles  } from '@material-ui/core/styles'

import axios from 'axios'

import BackGround from '../../assets/images/trade.jpeg'


const styles = theme => 
  createStyles({
  root: {
    padding: theme.spacing(3),
    margin: 'auto',
    opacity: '.7'
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
    justifyContent: 'center',
    marginBottom: '.5rem'
  },
  link: {
    textDecoration: 'none',
  }
})

class Login extends Component {

  state =
  {
    email: '',
    password: '',
    emailError: false,
    passwordError: false,
    isLoading: false
  }

  saveUserData = (token) => {
    localStorage.setItem(token)
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

  handleSubmit = (event) => {
    const { email, password } = this.state
    const user = { 
      'email': email, 
      'password': password,
    }

  axios.post('http://3.87.134.173:3000/authenticate', user)
    .then((response) => {
        this.setState({ isLoading: true })
        localStorage.setItem('token', response.data.token)

        if(response.data.token === undefined){
          alert('you are not assigned to our community .. Please register and try again ..');
          this.props.history.push('/signup'); 
        }
        else {
          this.props.history.push('/dashboard');
        }
    })
}

  render(){
    const {
      email,
      password,
      emailError,
      isLoading
    } = this.state;

   const { classes } = this.props;
   
    return (
    <Grid container className={classes.image}>
      <Card className={classes.root}>
        <CardHeader title="Login Form" />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                autoComplete="email"
                autoFocus
                value={email}
                error={emailError}
                onChange={this.emailOnChange}
              />

              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={this.passwordOnChange}
              />
              
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me" />

              <Button 
                onClick={this.handleSubmit} 
                disabled={isLoading}
                fullWidth 
                variant="contained" 
                color="secondary"
                className={classes.button}>
                  { isLoading && <i className="fa fa-refresh fa-spin"></i> }
                Sign In
              </Button>

              <Grid container>
                <Grid item xs>
                  <Link to="#" variant="body2" className={classes.link}>
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link to="/signup" variant="body2" className={classes.link}>
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
                </Grid>
        
      </Card>
    </Grid>
   )
  }
}

export default withStyles(styles)(Login) 