import React, {useEffect, useState} from 'react';
import Navbar from './components/Navbar';
import CarList from './components/CarList';

function Dashboard() {
    const [searchQuery, setSearchQuery] = useState('');
    const [cars, setCars] = useState([]);

    const handleSearchInputChange = (event) => {
        setSearchQuery(event.target.value);
    };

    useEffect(() => {
        fetch('http://localhost:8000/carsForDashboard', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            },
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => console.log(data) || setCars(data))
            .catch(error => {
                console.log('Fetching cars failed: ', error);
            });
    }, []);

    return (
        <div>
            <Navbar handleSearchInputChange={handleSearchInputChange}/>
            <CarList searchQuery={searchQuery} cars={cars}/>
        </div>
    );
}

export default Dashboard;
