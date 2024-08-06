import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Loader from '../component/Loader';
import Error from '../component/Error';
import moment from 'moment';
import StripeCheckout from 'react-stripe-checkout';
import Swal from 'sweetalert2';

function BookingScreen() {
  const { roomid, fromDate, toDate } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const currentUser = localStorage.getItem('currentUser');
    if (!currentUser) {
      window.location.href = '/login';
      return;
    }

    setUser(JSON.parse(currentUser));

    const fetchRoom = async () => {
      try {
        setLoading(true);
        const response = await axios.post(`/api/rooms/getroombyid/${roomid}`);
        setRoom(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message || 'Failed to fetch room details.');
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomid]);

  const calculateTotalDays = () => {
    const start = moment(fromDate, 'DD-MM-YYYY');
    const end = moment(toDate, 'DD-MM-YYYY');
    return end.diff(start, 'days');
  };

  const totalDays = calculateTotalDays();
  const totalAmount = totalDays * (room ? room.rentPerDay : 0);

  async function onToken(token) {
    const bookingDetails = {
      room: room,
      roomid: roomid,
      userid: user._id,
      fromDate,
      toDate,
      totalAmount,
      totalDays,
      token,
    };

    try {
      setLoading(true);
      const response = await axios.post('/api/bookings/bookroom', bookingDetails);
      setLoading(false);
      console.log('API Response:', response.data);
      if (response.data.success) {
        Swal.fire('Congratulations', 'Your Room has been Booked Successfully', 'success').then(result => {
          window.location.href = '/home';
        });
      } else {
        throw new Error('Booking failed');
      }
    } catch (error) {
      setLoading(false);
      console.error('Booking Error:', error);
      Swal.fire('Booking Failed', error.message || 'Please try again later.', 'error');
    }
  }

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        {loading ? (
          <Loader />
        ) : (
          room ? (
            <div className="row bs">
              <div className="col-md-6">
                <h1>{room.name}</h1>
                <img src={room.imageUrls[1]} alt="Room" className="bigImg" />
              </div>
              <div className="col-md-6" style={{ textAlign: 'right' }}>
                <h1>Booking Details</h1>
                <hr />
                <b>
                  <p>Name: {user.name}</p>
                  <p>From Date: {fromDate}</p>
                  <p>To Date: {toDate}</p>
                  <p>Max Count: {room.maxCount}</p>
                </b>

                <div>
                  <b>
                    <h1>Amount</h1>
                    <hr />
                    <p>Total days: {totalDays}</p>
                    <p>Rent Per Day: {room.rentPerDay}</p>
                    <p>Total Amount: {totalAmount}</p>
                  </b>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <StripeCheckout
                  amount={totalAmount * 100}
                  token={onToken}
                  currency='INR'
                  stripeKey="pk_test_51PcuTkAdrA8AK8Xx4XODFjv4XQFUW0aomIaJ5iYzkwWHxmTTas19WD6hqz5wEXLD5CK07xGgkYpLQUq7W2wfQDTe00F8zj0R2R"
                >
                  <button className="btn btn-primary">
                    Pay Now
                  </button>
                </StripeCheckout>
              </div>
            </div>
          ) : (
            <Error message={error} />
          )
        )}
      </div>
    </div>
  );
}

export default BookingScreen;
