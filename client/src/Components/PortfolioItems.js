import React from "react";
import { MDBContainer, MDBModal, MDBModalBody, MDBModalHeader } from 'mdbreact';
export default ({ item }) => {
    const [modal, toggle] = React.useState(false);
    return (
        <div>
            <MDBContainer style={{ zIndex: '9999'}}>
                <img
                    style={{ maxWidth: '100%', height: '200px' }}
                    onClick={() => { toggle(!modal) }}
                    alt={item._id}
                    src={`/${item.image}`}
                />
                <MDBModal isOpen={modal} toggle={() => { toggle(!modal) }} size="lg">
                    <MDBModalHeader toggle={() => { toggle(!modal) }}>Sector {item.sector}</MDBModalHeader>
                    <MDBModalBody >
                        <div >
                            <img
                                style={{ maxWidth: '100%' }}
                                alt={item._id}
                                src={`/${item.image}`}
                            />
                            <div >
                                {item.detail}
                            </div >
                        </div>
                    </MDBModalBody>
                </MDBModal>
            </MDBContainer>
        </div>
    )
}