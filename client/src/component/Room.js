import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from 'react-router-dom';

function Room({ room, fromDate, toDate }) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className='row room-card bs' style={{marginBottom: '20px', position: 'relative' }}>
      <div className='col-md-4'>
        {room.imageUrls && room.imageUrls.length > 0 ? (
          <img src={room.imageUrls[1]} alt='Room' className='smallimg' />
        ) : (
          <div className='placeholder'>Image not available</div>
        )}
      </div>
      <div className="col-md-7 d-flex flex-column justify-content-between">
        <div>
          <h1>{room.name}</h1>
          <b>
            <p>Max Count: {room.maxCount}</p>
            <p>Phone Number: {room.phoneNumber}</p>
            <p>Type: {room.type}</p>
          </b>
        </div>
        <div style={{ position: 'absolute', bottom: '3px', right: '10px' }}>
         
         {(fromDate && toDate)&&(
          <Link to={`/pay/${room._id}/${fromDate}/${toDate}`}>
          <button className='btn btn-primary ' >Book Now</button>
          </Link>)}
          <button className="btn btn-primary " onClick={handleShow}>View Details</button>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{room.name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Carousel data-bs-theme="dark" prevLabel='' nextLabel=''>
            {room.imageUrls.map((url, index) => (
              <Carousel.Item key={index}>
                <img
                  className="d-block w-100 bigImg"
                  src={url}
                  alt={`Slide ${index + 1}`}
                />
              </Carousel.Item>
            ))}
          </Carousel>
          <p>{room.description}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>Close</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default Room;
