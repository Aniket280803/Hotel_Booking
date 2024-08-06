import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../component/Loader';


function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await (await axios.get('/api/bookings/getallbookings')).data;
        setBookings(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message || 'Failed to fetch bookings.');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="row">
      <div className="col-12">
        <h1>Bookings</h1>
        {loading && <Loader />}
        {error && <p className="error-message">{error}</p>}
        <div className="table-responsive">
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Booking id</th>
                <th>User Id</th>
                <th>Room</th>
                <th>From</th>
                <th>To</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {bookings.length > 0 ? (
                bookings.map(booking => (
                  <tr key={booking._id}>
                    <td>{booking._id}</td>
                    <td>{booking.userid}</td>
                    <td>{booking.room}</td>
                    <td>{booking.fromDate}</td>
                    <td>{booking.toDate}</td>
                    <td>{booking.status}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center">No bookings available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Bookings;
