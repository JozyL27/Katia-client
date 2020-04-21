import React, { Component } from 'react'
import Signup from '../../components/Signup/Signup'

export default class SignupPage extends Component {
  static defaultProps = {
    history: {
      push: () => {},
    },
  }

  handleRegistrationSuccess = user_name => {
    const { history } = this.props
    history.push(`/swipe`)
  }

  render() {
    return (
      <React.Fragment>
        <Signup
          onRegistrationSuccess={this.handleRegistrationSuccess}
        />
      </React.Fragment>
    )
  }
}