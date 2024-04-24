import React from 'react';
import ReactDOM from 'react-dom';
// import {db} from './firebaseConfig'; // Import Firebase
import 'firebase/database'; // Import Firebase Realtime Database module
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginScreen from './components/LoginScreen'; // Import the Login component
import MainPage from './components/MainPage'; // Import the Login component

const App = () => {
  return (
<Router>
      <div>
        <Routes>
          <Route exact path='/' element={<MainPage />} />
	        <Route exact path='/LoginScreen' element={<LoginScreen />} />
          {/* <Route exact path='/Form' element={<LoginScreen />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App; // Export App as the default export

ReactDOM.render(<App />, document.getElementById('root'));
