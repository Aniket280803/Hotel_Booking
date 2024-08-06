import React, { useEffect, useState } from 'react';
import { Tabs, message } from 'antd';
import axios from 'axios';
import Loader from '../component/Loader';
import Error from '../component/Error';
import Swal from 'sweetalert2';
import { Tag } from 'antd';
const useCurrentUser = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));
    setUser(currentUser);
    setLoading(false);
  }, []);

  return { user, loading };
};

function ProfileScreen() {
  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (!loading && !user) {
      window.location.href = '/login';
    }
  }, [loading, user]);

  if (loading) return <Loader />;
  if (!user) return null;

  const items = [
    {
      key: '1',
      label: 'Profile',
      children: (
        <>
          <h2>My Profile</h2>
          <br />
          <p><b>Name:</b> {user.name}</p>
          <p><b>Email:</b> {user.email}</p>
          <p><b>isAdmin:</b> {user.isAdmin ? 'YES' : 'NO'}</p>
        </>
      ),
    },
    {
      key: '2',
      label: 'Bookings',
      children: <MyBookings userId={user._id} />,
    },
  ];

  return (
    <div className='ml-3 mt-5 bs'>
      <Tabs defaultActiveKey="1" items={items} />
    </div>
  );
}

export default ProfileScreen;

export function MyBookings({ userId }) {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.post('/api/bookings/getbookingsbyuserid', { userid: userId });
        setBookings(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    if (userId) {
      fetchData();
    } else {
      setError('User data is missing or incomplete');
      setLoading(false);
    }
  }, [userId]);

  const cancelBooking = async (bookingId, roomId) => {
    try {
      setLoading(true);
      const response = await axios.post('/api/bookings/cancel', { bookingid: bookingId, roomid: roomId });
      if (response.data.message) {
        Swal.fire('Congrats', 'Your booking has been cancelled', 'success').then(() => {
          setBookings((prevBookings) =>
            prevBookings.map((booking) => 
              booking._id === bookingId ? { ...booking, status: 'Cancelled' } : booking
            )
          );
        });
      } else {
        Swal.fire('Oops', 'Failed to cancel booking', 'error');
      }
    } catch (error) {
      message.error('Error cancelling booking');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <Error message={error.message || 'Error fetching bookings'} />;
  }

  return (
    <div>
      <h1>My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found</p>
      ) : (
        <div className="row">
          <div className="col-md-6">
            {bookings.map(booking => (
              <div className="bs" key={booking._id} style={{ position: 'relative' }}>
                <h1>{booking.room}</h1>
                <p><b>BookingId:</b> {booking._id}</p>
                <p><b>CheckIn:</b> {booking.fromDate}</p>
                <p><b>Check Out:</b> {booking.toDate}</p>
                <p><b>Amount:</b> {booking.totalAmount}</p>
                <p><b>Status:</b> {booking.status === 'Cancelled' ? (<Tag color="red">CANCELLED</Tag>) : (<Tag color="Green">CONFIRMED</Tag>)}</p>
                {booking.status !== 'Cancelled' && (
                  <div>
                    <button
                      className="btn btn-danger"
                      style={{ position: 'absolute', bottom: '10px', right: '10px' }}
                      onClick={() => cancelBooking(booking._id, booking.roomid)}
                    >
                      Cancel Booking
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}