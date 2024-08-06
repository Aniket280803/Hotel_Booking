import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../component/Loader';
import Swal from 'sweetalert2';

function RemoveRoom() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await (await axios.get('/api/rooms/getallrooms')).data;
        setRooms(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(error.message || 'Failed to fetch rooms.');
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  const removeRoom = async (roomId) => {
    try {
      setLoading(true);
      await axios.delete(`/api/rooms/removeroom/${roomId}`);
      setRooms(rooms.filter(room => room._id !== roomId));
      setLoading(false);
      Swal.fire('Deleted!', 'Room has been deleted.', 'success');
    } catch (error) {
      console.log(error);
      setError(error.message || 'Failed to remove room.');
      setLoading(false);
      Swal.fire('Oops', 'Something went wrong', 'error');
    }
  };

  return (
    <div className="row">
      <div className="col-12">
        <h1>Remove Room</h1>
        {loading && <Loader />}
        {error && <p className="error-message">{error}</p>}
        <div className="table-responsive">
          <table className="table table-bordered table-dark">
            <thead className="bs">
              <tr>
                <th>Room id</th>
                <th>Name</th>
                <th>Type</th>
                <th>Rent Per Day</th>
                <th>Max Count</th>
                <th>Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.length > 0 ? (
                rooms.map(room => (
                  <tr key={room._id}>
                    <td>{room._id}</td>
                    <td>{room.name}</td>
                    <td>{room.type}</td>
                    <td>{room.rentPerDay}</td>
                    <td>{room.maxCount}</td>
                    <td>{room.phoneNumber}</td>
                    <td>
                      <button
                        className="btn btn-danger"
                        onClick={() => removeRoom(room._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">No rooms available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default RemoveRoom;
