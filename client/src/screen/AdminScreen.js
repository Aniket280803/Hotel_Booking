import React, { useEffect, useState } from 'react';
import { Tabs } from 'antd';
import axios from 'axios';
import Loader from '../component/Loader';
import RemoveRoom from '../component/RemoveRoom';
import AddRoom from '../component/AddRoom';
import Bookings from '../component/Bookings';

// Main Admin Screen Component
function AdminScreen() {
    useEffect(() => {
        const currentUser = JSON.parse(localStorage.getItem("currentUser"));
        if (!currentUser || !currentUser.isAdmin) {
            window.location.href = '/home';
        }
    }, []);

    const items = [
        {
            key: '1',
            label: 'Bookings',
            children: <Bookings />,
        },
        {
            key: '2',
            label: 'Room',
            children: <Rooms />,
        },
        {
            key: '3',
            label: 'Add Room',
            children: <AddRoom />,
        },
        {
            key: '4',
            label: 'Users',
            children: <Users />,
        },
        {
            key: '5',
            label: 'Remove Room',
            children: <RemoveRoom />,
        },
    ];

    return (
        <div className='container mt-5'>
            <h2>Admin Panel</h2>
            <Tabs defaultActiveKey="1" items={items} />
        </div>
    );
}

export default AdminScreen;

// Rooms Component
function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get("/api/rooms/getallrooms");
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

    return (
        <div className="table-responsive">
            <h1>Rooms</h1>
            {loading && <Loader />}
            {error && <p className="error-message">{error}</p>}
            <table className='table table-bordered table-dark'>
                <thead>
                    <tr>
                        <th>Room id</th>
                        <th>Name</th>
                        <th>Type</th>
                        <th>Rent Per Day</th>
                        <th>Max Count</th>
                        <th>Phone Number</th>
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
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6">No rooms available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

// Users Component
function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data } = await axios.get("/api/users/all");
                setUsers(data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setError(error.message || 'Failed to fetch users.');
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="table-responsive">
            <h1>Users</h1>
            {loading && <Loader />}
            {error && <p className="error-message">{error}</p>}
            <table className='table table-bordered table-dark'>
                <thead>
                    <tr>
                        <th>User id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>is Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {users.length > 0 ? (
                        users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td>{user.email}</td>
                                <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4">No users available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}
