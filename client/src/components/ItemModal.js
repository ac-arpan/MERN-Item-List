import React, { Component } from 'react'
import { Button, Modal, ModalHeader, ModalBody, Form, FormGroup, Label, Input} from 'reactstrap'
import { connect } from 'react-redux'
import { addItem } from '../actions/itemActions'
import PropTypes from 'prop-types'

class ItemModal extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            modal : false,
            name : ''
        }
    }

    toggle = () => {
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

        const newItem = {
            //id:mogonDB created it's own
            name : this.state.name
        }

        // ADD item via addItem action
        this.props.addItem(newItem)

        // Close the modal
        this.toggle()
    }

    
    
    render() {
        return (
            <div>
                { this.props.isAuthenticated ? <Button color="dark" style ={{marginBottom:"2rem"}} onClick = {this.toggle}>Add Item</Button> : <h4 className="mb-3 ml-4">Please login to manage items..</h4>}

                <Modal isOpen = {this.state.modal} toggle = {this.toggle}>

                    <ModalHeader toggle = {this.toggle}>Add Item to Shopping List</ModalHeader>
                    <ModalBody>
                        <Form onSubmit = {this.onSubmit}>
                            <FormGroup>
                                <Label for="item">Add Item</Label>
                                <Input type="text" name = "name" id= "item" placeholder="Add shopping item..." onChange = {this.onChange} />
                                <Button color="dark" style={{marginTop:'2rem'}} block>ADD</Button>
                            </FormGroup>
                        </Form>
                    </ModalBody>

                </Modal>
            </div>
        )
    }

    static propTypes = {
        isAuthenticated: PropTypes.bool
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.isAuthenticated
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addItem : newItem => dispatch(addItem(newItem))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemModal)
