import React, { Component } from 'react'
import {Link} from 'react-router-dom'
import TokenService from '../../services/token-service'
import AuthService from '../../services/auth-api-service'
import './Signup.css'

export default class Signup extends Component {
  static defaultProps = {
    onRegistrationSuccess: () => {}
  }

  state = { error: null }

  handleSubmit = ev => {
    ev.preventDefault()
    const { email, display_name, password, confirm_password } = ev.target
    const user = {
      email: email.value,
      display_name: display_name.value,
      password: password.value
    }

    AuthService.registerUser(user)
      .then(() => {
        AuthService.postLogin({
          email: email.value,
          password: password.value
        })
          .then(res => {
            password.value = ''
            TokenService.saveAuthToken(res.authToken)
            this.props.onRegistrationSuccess(user.user_name)
            email.value = ''
            display_name.value = ''
          })
      })
  }

  render() {
    const { error } = this.state
    return (
      <main id='lp_main-flex'>
        <Link to='/' className='lp_lp-link'>Project Manhattan</Link>
        <section className='Signup__container'>
          <h2 className='Signup__header'>Signup</h2>
          <form
            className='Signup__form'
            onSubmit={this.handleSubmit}
          >
            <div role='alert'>
              {error && <p className='Signup__error'>{error}</p>}
            </div>
            <div className='Signup__email-div lp_input-div'>
              <label htmlFor='Signup__email'>
                Email
              </label>
              <input
                name='email'
                type='email'
                required
                id='Signup__email'
                className='lp_input'>
              </input>
            </div>
            <div className='Signup__display_name-div lp_input-div'>
              <label htmlFor='Signup__display_name'>
                Display Name
              </label>
              <input
                name='display_name'
                type='text'
                required
                id='Signup__display_name'
                className='lp_input'>
              </input>
            </div>
            <div className='Signup__password-div lp_input-div'>
              <label htmlFor='Signup__password'>
                Password 
              </label>
              <input
                name='password'
                type='password'
                required
                id='Signup__password'
                className='lp_input'>
              </input>
            </div>
            <div className='Signup__confirm_password-div lp_input-div'>
              <label htmlFor='Signup__confirm_password'>
                Confirm Password 
              </label>
              <input
                name='confirm_password'
                type='confirm_password'
                required
                id='Signup__confirm_password'
                className='lp_input'>
              </input>
            </div>
            <div className='Signup__submit-button-div'>
              <button className='Signup__submit-button lp_button' type='submit'>
                Sign Up
              </button>
              <p className='Signup__or'>or</p>
              <Link className='Signup__login-link lp_button' to='/login'>Login</Link>
            </div>
          </form>
        </section>
      </main>
    )
  }
}
