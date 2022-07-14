import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class LoginForm extends Component {
  state = {username: '', password: '', loginStatus: false, errorMessage: ''}

  handleUsername = e => {
    this.setState({username: e.target.value, loginStatus: false})
  }

  handlePassword = e => {
    this.setState({password: e.target.value, loginStatus: false})
  }

  handleLogin = e => {
    e.preventDefault()
    this.startLogin()
  }

  setToken = token => {
    Cookies.set('jwt_token', token, {expires: 10})
    const {history} = this.props
    history.replace('/')
  }

  showError = message => {
    this.setState({loginStatus: true, errorMessage: message})
  }

  startLogin = async () => {
    const {username, password} = this.state
    const data = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(data),
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const token = await response.json()
      this.setToken(token.jwt_token)
    } else if (response.status === 400) {
      const error = await response.json()
      this.showError(error.error_msg)
    }
  }

  render() {
    const {username, password, loginStatus, errorMessage} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="LoginContainer">
        <div className="LoginFormContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="LoginFormBrandImage"
          />
          <form className="LoginInputsContainer">
            <label htmlFor="usernameId">USERNAME</label>
            <br />
            <input
              id="usernameId"
              input="text"
              placeholder="Username"
              className="LoginFormInput"
              value={username}
              onChange={this.handleUsername}
            />
            <br />
            <br />
            <label htmlFor="passwordId">PASSWORD</label>
            <br />
            <input
              id="passwordId"
              type="password"
              placeholder="Password"
              className="LoginFormInput"
              value={password}
              onChange={this.handlePassword}
            />

            <div className="LoginFormButtonContainer">
              <button
                className="LoginFormLoginButton"
                type="submit"
                onClick={this.handleLogin}
              >
                Login
              </button>
              {loginStatus && (
                <p className="LoginErrorParagraph">*{errorMessage}</p>
              )}
            </div>
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
