import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input, NavLink, Alert} from 'reactstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

class RegisterModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            modal : false,
            name : '',
            email: '',
            password: '',
            msg: null
        }
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props
        if(error !== prevProps.error) {
            // Check for the register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg})
            }else {
                this.setState({ msg: null})
            }
        }

        // If authenticated close modal
        if(this.state.modal) {
            if(isAuthenticated) {
                this.toggle()
            }
        }
    }

    toggle = () => {
        // Clear errors
        this.props.clearErrors()
        this.setState({
            modal : !this.state.modal
        })
    }

    onChange = e => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    onSubmit = e => {
        e.preventDefault()

        const { name, email, password } = this.state
        const newUser ={
            name,
            email,
            password
        }
        // Attempt to register
        this.props.register(newUser)

       
    }

    
    
    render() {
        return (
            <div>
                <NavLink  onClick = {this.toggle} href="#">Register</NavLink>

                <Modal isOpen = {this.state.modal} toggle = {this.toggle}>

                    <ModalHeader toggle = {this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                        <Form onSubmit = {this.onSubmit}>
                            <FormGroup>
                                <Label for="name">Name</Label>
                                <Input className="mb-3" type="text" name = "name" id= "name" placeholder="Name" onChange = {this.onChange} />

                                <Label for="email">Email</Label>
                                <Input className="mb-3" type="email" name = "email" id= "email" placeholder="Email" onChange = {this.onChange} />

                                <Label for="password">Password</Label>
                                <Input className="mb-3" type="password" name = "password" id= "password" placeholder="Password" onChange = {this.onChange} />

                                <Button type="submit" color="dark" style={{marginTop:'2rem'}} block>Register</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }
    static ropTypes = {
        isAuthenticated: PropTypes.bool,
        error: PropTypes.object.isRequired,
        register: PropTypes.func.isRequired,
        clearErrors: PropTypes.func.isRequired
    }
}


const mapStateToProps = state => {
    return {
        isAuthenticated : state.auth.isAuthenticated,
        error : state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        register : (newUser) => dispatch(register(newUser)),
        clearErrors : () => dispatch(clearErrors()) 
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(RegisterModal)
