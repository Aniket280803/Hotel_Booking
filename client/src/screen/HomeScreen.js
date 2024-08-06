import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import Room from '../component/Room';
import Loader from '../component/Loader';
import Error from '../component/Error';
import moment from 'moment';
import { DatePicker, Space } from "antd";
import ScrollToTop from '../component/ScrollToTop'; // Import the ScrollToTop component

const { RangePicker } = DatePicker;

function HomeScreen() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [fromDate, setFromDate] = useState();
  const [toDate, setToDate] = useState();
  const [duplicateRooms, setDuplicateRooms] = useState([]);
  const [searchKey, setSearchKey] = useState('');
  const [type, setType] = useState('all');

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        setLoading(true);
        const { data } = await axios.get('/api/rooms/getallrooms');
        setRooms(data);
        setDuplicateRooms(data);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchRooms();
  }, []);

  const filterRooms = useCallback(() => {
    let filteredRooms = duplicateRooms;

    if (fromDate && toDate) {
      const fromDateMoment = moment(fromDate, 'DD-MM-YYYY');
      const toDateMoment = moment(toDate, 'DD-MM-YYYY');

      filteredRooms = filteredRooms.filter(room => {
        if (room.currentBooking.length === 0) {
          return true;
        }

        let isAvailable = true;

        for (const booking of room.currentBooking) {
          const bookingFromDate = moment(booking.fromDate, 'DD-MM-YYYY');
          const bookingToDate = moment(booking.toDate, 'DD-MM-YYYY');
          if (
            fromDateMoment.isBetween(bookingFromDate, bookingToDate, null, '[]') ||
            toDateMoment.isBetween(bookingFromDate, bookingToDate, null, '[]') ||
            bookingFromDate.isBetween(fromDateMoment, toDateMoment, null, '[]') ||
            bookingToDate.isBetween(fromDateMoment, toDateMoment, null, '[]')
          ) {
            isAvailable = false;
            break;
          }
        }

        return isAvailable;
      });
    }

    if (searchKey) {
      filteredRooms = filteredRooms.filter(room =>
        room.name.toLowerCase().includes(searchKey.toLowerCase())
      );
    }

    if (type !== 'all') {
      filteredRooms = filteredRooms.filter(room =>
        room.type.toLowerCase() === type.toLowerCase()
      );
    }

    setRooms(filteredRooms);
  }, [fromDate, toDate, searchKey, type, duplicateRooms]);

  const filterByDate = (dates, dateStrings) => {
    setFromDate(dateStrings[0]);
    setToDate(dateStrings[1]);
  };

  useEffect(() => {
    filterRooms();
  }, [fromDate, toDate, searchKey, type, filterRooms]);

  return (
    <div className="container justify-content-center mt-8" style={{ paddingTop: '12vh' }}>
      <div className="row mt-10 bs">
        {loading && <Loader />}
        <div className="col-md-3">
          <Space direction="vertical" size={12}>
            <RangePicker className='datePic' format="DD-MM-YYYY" onChange={filterByDate} />
          </Space>
        </div>
        <div className="col-md-5">
          <input 
            type="text" 
            className='form-control' 
            placeholder='search rooms'
            value={searchKey} 
            onChange={(e) => { setSearchKey(e.target.value); }}
          />
        </div>
        <div className="col-md-3">
          <select className='form-control' value={type} onChange={(e) => setType(e.target.value)}>
            <option value="all">All</option>
            <option value="delux">Delux</option>
            <option value="Non-Delux">Non-Delux</option>
          </select>
        </div>
      </div>
      <div className="row w-100 justify-content-center">
        {loading ? (
          <Loader />
        ) : error ? (
          <Error />
        ) : rooms.length > 0 ? (
          rooms.map((room) => (
            <div className="col-10 mt-2" key={room._id}>
              <Room room={room} fromDate={fromDate} toDate={toDate} />
            </div>
          ))
        ) : (
          <div className="col-10 mt-2">
            <h3>No rooms available</h3>
          </div>
        )}
      </div>
      <ScrollToTop /> {/* Add the ScrollToTop component */}
    </div>
  );
}

export default HomeScreen;
