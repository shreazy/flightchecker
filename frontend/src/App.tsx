import { useState } from 'react'
import './App.css';

// Header component
function Header() {
    return <h1>Flight Search</h1>;
}

// Search component
function Search() {
    const [flightNumber, setFlightNumber] = useState('');

    const handleSearch = () => {
        // This is where we will call the API to get the flight info
        // For now, let's just log the flight number
        console.log(flightNumber);
    };

    return (
        <div>
            <input
                type="text"
                value={flightNumber}
                onChange={e => setFlightNumber(e.target.value)}
                placeholder="Enter flight number"
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

// FlightInfo component
function FlightInfo() {
    // This component will display the flight info
    // For now, it's just a placeholder
    return <div>Flight Info will be displayed here</div>;
}

// Main App component
function App() {
    return (
        <div>
            <Header />
            <Search />
            <FlightInfo />
        </div>
    );
}

export default App;
