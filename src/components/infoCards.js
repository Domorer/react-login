import React, { Component } from 'react'
import '../bootstrap/css/bootstrap.min.css'

import '../style/infoCards.css'

import { Table, OverlayTrigger } from 'react-bootstrap'
import { connect } from 'react-redux'
import { login } from '../redux/user.redux'

const renderTooltip = (props) => (
    <div
        style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            padding: '2px 10px',
            color: 'white',
            borderRadius: 3,
            maxWidth: '200px',
            wordBreak: "break-all",
            wordWrap: 'break-word'
        }}
    >
        {props}
    </div>
);

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
                                    <OverlayTrigger
                                        placement="right-start"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip(Element.pwd)}
                                    >
                                        <td className='scroll'>{Element.pwd}</td>
                                    </OverlayTrigger>

                                    <OverlayTrigger
                                        placement="right-start"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip(Element.email)}
                                    >
                                        <td className='scroll'>{Element.email}</td>
                                    </OverlayTrigger>
                                    <td>{Element.prov}</td>
                                    <OverlayTrigger
                                        placement="right-start"
                                        delay={{ show: 250, hide: 400 }}
                                        overlay={renderTooltip(Element.city)}
                                    >
                                        <td className='scroll'>{Element.city}</td>
                                    </OverlayTrigger>

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