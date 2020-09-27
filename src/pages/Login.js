import React, { Component } from 'react'
import { Jumbotron, Button, Form, FormGroup, Label, Input, Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap'
import { Link } from 'react-router-dom'
import alert from 'sweetalert2'

export default class Login extends Component {
  constructor(props) {
    super(props)
    this.state = {
      email: '',
      password: '',
      showModal: false,
      isLoading: false,
    }
  }

  onLogin = (e) => {
    e.preventDefault()
    this.setState({ isLoading: true })
    const { email, password } = this.state
    if (email === 'ppdb@admin' && password === 'admin') {
      alert.fire({
        icon: 'success',
        tittle: 'Congratulations!!',
        text: 'Login Success!!'
      })
      this.setState({ isLoading: false }, () => {
        localStorage.setItem('token', true)
        this.props.history.push('/home')
      })
    } else {
      this.setState({ showModal: true, isLoading: false })
    }
  }

  checkLogin = () => {
    if (localStorage.getItem('token')) {
      this.props.history.push('/home')
    }
  }

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  }

  componentDidMount() {
    this.checkLogin()
  }

  render() {
    return (
      <>
        <div className="d-flex justify-content-center align-items-center mt-5 content">
          <Jumbotron>
            <h3 className='mb-4'>Welcome! <br></br> Please Login Dude</h3>
            <Form onSubmit={this.onLogin}>
              <FormGroup>
                <Label for="exampleEmail">Email</Label>
                <Input type="email" name="email" id="exampleEmail" placeholder="Your Email" onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="examplePassword">Password</Label>
                <Input type="password" name="password" id="examplePassword" placeholder="Your Password" onChange={this.handleChange} />
              </FormGroup>
              <div>
                <Button color='success'>Login</Button>
                <Link to='/register'>
                  <Button color="info" className="text-white ml-2">Register</Button>
                </Link>
              </div>
            </Form>
          </Jumbotron>
        </div>
        <Modal isOpen={this.state.showModal}>
          <ModalHeader>Warning</ModalHeader>
          <ModalBody>
            Wrong Username or Password
        </ModalBody>
          <ModalFooter>
            <Button autoFocus onClick={() => this.setState({ showModal: false })} color='primary'>OK</Button>
          </ModalFooter>
        </Modal>
      </>
    )
  }
}