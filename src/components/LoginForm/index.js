// Write your JS code here

import {Component} from 'react'

import './index.css'

class LoginForm extends Component {
  state = {
    inputUserName: '',
    inputPassword: '',
    isPasswordCorrect: false,
    errMsg: '',
  }

  onChangePassword = event => {
    this.setState({inputPassword: event.target.value})
  }

  onChangeUsername = event => {
    this.setState({inputUserName: event.target.value})
  }

  renderPassword = () => {
    const {inputPassword} = this.state
    return (
      <>
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          className="input"
          id="password"
          value={inputPassword}
          onChange={this.onChangePassword}
          placeholder="Username"
        />
      </>
    )
  }

  renderUserName = () => {
    const {inputUserName} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          className="username-input-filed"
          value={inputUserName}
          onChange={this.onChangeUsername}
          placeholder="password"
        />
      </>
    )
  }

  submitSuccess = () => {
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = statusText => {
    this.setState({isPasswordCorrect: true, errMsg: statusText})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess()
    } else {
      this.onSubmitFailure(data.status_text)
    }
  }

  render() {
    const {isPasswordCorrect, errMsg} = this.state

    return (
      <div className="bg-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-login-img.png"
          alt="website login"
          className="login-img"
        />
        <div className="form-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-logo-img.png"
            alt="website logo"
            className="logo-img"
          />
          <form className="form" onSubmit={this.onSubmitForm}>
            <div className="input-cont">{this.renderUserName()}</div>
            <div className="input-cont">{this.renderPassword()}</div>
            <button type="submit" className="button">
              Login
            </button>
            {isPasswordCorrect && <p className="p">{errMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginForm
