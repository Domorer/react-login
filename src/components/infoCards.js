import React, { Component } from 'react'
import '../bootstrap/css/bootstrap.min.css'

import '../style/infoCards.css'

import { Table, OverlayTrigger } from 'react-bootstrap'
import { connect } from 'react-redux'
import { login } from '../redux/user.redux'

@connect(
    state => state,
    { login }
)


class InfoTable extends Component {
    render() {
        return (
            <Table striped bordered hover variant={this.props.bgColor} id={this.props.cardId}>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Password</th>
                        <th>Email</th>
                        <th>Province</th>
                        <th>City</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        this.props.data.map((Element, i) => {
                            return (
                                <tr key={this.props.cardId + '-tr-' + i}>
                                    <td>{Element.username}</td>
                                    <td className='scroll'>{Element.pwd}</td>
                                    <td className='scroll'>{Element.email}</td>
                                    <td>{Element.prov}</td>
                                    <td className='scroll'>{Element.city}</td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        )
    }

}

export default InfoTable