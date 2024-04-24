import React, { useState, useEffect } from 'react';
import { auth } from '../firebaseConfig';
import { Link } from 'react-router-dom';
import '../css/MainPage.css';
import '../css/try.css';
import Display from './Display';


function MainPage() {
    const [loggedIn, setLoggedIn] = useState(false);


    useEffect(() => {
        const parent = document.querySelectorAll('.animate-text');
        for (let i = 0; i < parent.length; i++) {
          parent[i].style.width = parent[i].children[0].clientWidth + "px";
        }
      }, []);
    
      useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
          if (user) {
            // User is logged in
            setLoggedIn(true);
          } else {
            // No user is logged in
            setLoggedIn(false);
          }
        });
    
        // Clean up the subscription
        return () => unsubscribe();
      }, []);

      const handleLogout = async () => {
        try {
          await auth.signOut(); // Sign out the user
          // Optionally, you can navigate the user to another page after logout
          // For example, you can redirect the user to the login page
          // window.location.href = '/login'; // Redirect to the login page
        } catch (error) {
          console.error("Error logging out:", error);
        }
      };

  return (
    <div className="main-container">
      <nav className="menu-nav">
        <Link to="/" className="nav-button">Home</Link>
        <Link to="/about" className="nav-button">About</Link>
        <Link to="/services" className="nav-button">Services</Link>
        <Link to="/LoginScreen" className="nav-button">Connexion</Link>
        {/* <Link to="/Form" className="nav-button">AddInfo</Link> */}
        {loggedIn && <button className="nav-button" onClick={handleLogout}>Logout</button>}
      </nav>
      <div className="main-content">
            <div>
            <h1>Main Page</h1>
            </div>
        {/* Основний вміст сторінки */}
      </div>

      <div className="App">
      <div className="bg-text-container">
        <div className="animate-text">
          <span>Driven Better&nbsp;</span>
          <span>Driven Better&nbsp;</span>
        </div>
        <div className="animate-text left">
          <span>Driven Better&nbsp;</span>
          <span>Driven Better&nbsp;</span>
        </div>
      </div>

      <div className="container">
        <div className="col">
          <h1>Heading</h1>
          <p>Lobortis primis, ultrices? Earum mollis! Ad consequuntur laboriosam ut possimus, minus expedita, adipisci fermentum, officia maecenas voluptatibus eiusmod, laboriosam maiores aspernatur ad egestas tenetur tempora.</p>
        </div>

        
      </div>

      <div>
        <Display/>
        {/* {loggedIn && <button onClick={handleEdit}>Edit</button>} */}
      </div>
    </div>

    </div>
  );
}

export default MainPage;
