import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Navbar extends Component {
    render() {
        return (
            <nav className="navbar">
                <Link to="/">
                    <h3>Home</h3>
                </Link>

                <Link to="/campuses">
                    <h3>Campuses</h3>
                </Link>

                <Link to="/students">
                    <h3>Students</h3>
                </Link>
            </nav>
        )
    }
}

export default Navbar;