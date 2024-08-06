import React, { useState } from 'react'
import axios from 'axios';
import Loader from '../component/Loader';
import Swal from 'sweetalert2';

function AddRoom() {
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [rentPerDay, setRentPerDay] = useState('');
    const [maxCount, setMaxCount] = useState('');
    const [description, setDescription] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [type, setType] = useState('');
    const [imageUrl1, setImageUrl1] = useState('');
    const [imageUrl2, setImageUrl2] = useState('');
    const [imageUrl3, setImageUrl3] = useState('');

    async function addRoom() {
        const newroom = {
            name,
            rentPerDay,
            maxCount,
            description,
            phoneNumber,
            type,
            imageUrls: [imageUrl1, imageUrl2, imageUrl3]
        };
        try {
            setLoading(true);
            const result = await axios.post('/api/rooms/addroom', newroom);
            console.log(result.data);
            setLoading(false);
            Swal.fire('Congrats', "Your Room added Successfully", 'success').then(result => {
                window.location.href = '/home';
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
            Swal.fire('Oops', 'Something Went Wrong', 'error');
        }
    }

    return (
        <div className="row">
            <div className="col-md-6">
                {loading && <Loader />}
                <input
                    type="text"
                    className='form-control mb-3'
                    placeholder='Room Name'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />
                <input
                    type="number"
                    className='form-control mb-3'
                    placeholder='Rent Per Day'
                    value={rentPerDay}
                    onChange={(e) => setRentPerDay(e.target.value)}
                />
                <input
                    type="number"
                    className='form-control mb-3'
                    placeholder='Max Count'
                    value={maxCount}
                    onChange={(e) => setMaxCount(e.target.value)}
                />
                <textarea
                    className='form-control mb-3'
                    placeholder='Description'
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows="4"
                />
                <input
                    type="number"
                    className='form-control mb-3'
                    placeholder='Phone Number'
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                />
            </div>
            <div className="col-md-6">
                <input
                    type="text"
                    className='form-control mb-3'
                    placeholder='Type'
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                />
                <input
                    type="text"
                    className='form-control mb-3'
                    placeholder='Image URL 1'
                    value={imageUrl1}
                    onChange={(e) => setImageUrl1(e.target.value)}
                />
                <input
                    type="text"
                    className='form-control mb-3'
                    placeholder='Image URL 2'
                    value={imageUrl2}
                    onChange={(e) => setImageUrl2(e.target.value)}
                />
                <input
                    type="text"
                    className='form-control mb-3'
                    placeholder='Image URL 3'
                    value={imageUrl3}
                    onChange={(e) => setImageUrl3(e.target.value)}
                />
                <div className="d-flex justify-content-end">
                    <button className='btn btn-primary mt-2' onClick={addRoom}>Add Room</button>
                </div>
            </div>
        </div>
    );
}

export default AddRoom ;