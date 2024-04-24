import React, { useState, useEffect } from 'react';
import { getDatabase, set, ref, onValue } from "firebase/database";
import { auth } from "../firebaseConfig";
import { saveTextToFirebase } from '../firebaseConfig';

const Display = () => {
    const [savedData, setSavedData] = useState("");
    const [editMode, setEditMode] = useState(false); 
    const [editText, setEditText] = useState("");
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        // Function to fetch text data from Firebase
        const fetchTextDataFromFirebase = () => {
          const database = getDatabase();
          const databaseRef = ref(database, 'Information');
    
          // Listen for changes to the 'textNode' in the database
          onValue(databaseRef, (snapshot) => {
            const data = snapshot.val(); // Get the data from the snapshot
            if (data) {
              setSavedData(data); // Update the component state with the retrieved data
            }
          });
        };
    
        // Call the fetchTextDataFromFirebase function
        fetchTextDataFromFirebase();
    
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

    const handleEdit = () => {
      setEditMode(true); // Enter edit mode
      setEditText(savedData); // Set the edited text to the current saved data
    };

    const handleSave = () => {
        saveTextToFirebase(editText)
        console.log("Saving edited text:", editText);
        setEditMode(false); // Exit edit mode
        window.location.reload();
    };

    const handleCancel = () => {
        setEditMode(false); // Exit edit mode without saving
    };

    const handleChange = (event) => {
        setEditText(event.target.value); // Update the edited text as it changes
    };

    const handleClear = () => {
      // Clear the text saved in the Realtime Firebase Database
      const database = getDatabase();
      const databaseRef = ref(database, 'Information');
      set(databaseRef, ""); // Set the value of the database node to an empty string
      
      // Refresh the page
      window.location.reload();
    };

    return (
        <div className="saved-data">
            {editMode ? (
                <div>
                    <input
                        type="text"
                        value={editText}
                        onChange={handleChange}
                    />
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                </div>
            ) : (
                <div>
                    <div>
                      <h2>Information:</h2>
                      <p>{savedData}</p>
                      {loggedIn && <button onClick={handleEdit}>Edit</button>}
                      {loggedIn && <button onClick={handleClear}>Clear</button>}
                    </div>
                    
                </div>
            )}
        </div>
    )
}

export default Display
