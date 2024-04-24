import React, { useState, useEffect } from "react";
import { db } from "../firebaseConfig";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { useLocation } from "react-router-dom";

const TextChange = ({ history }) => {
    const [bookName, setBookName] = useState('');
    const location = useLocation();

    useEffect(() => {
        if (location.state?.book) {
            const { book } = location.state;
            setBookName(book.data.bookName);
        }
    }, [location.state?.book]);

    const sendBookToDb = async () => {
        try {
            const docRef = await addDoc(collection(db, 'Books'), {
                bookName: bookName
            });

            setBookName('');

            console.log("Document written with ID: ", docRef.id);
            alert("Document written with ID: " + docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const editBookToDb = async () => {
        const bookRef = doc(db, 'Books', location.state?.book.id);
        console.log("editing : ", location.state?.book)
        await updateDoc(bookRef, {
            bookName: bookName
        });
        history.push('/BookList');
    }

    return (
        <div className="container">
            {location.state?.book ?
                <>
                    <h1 className="heading">BookForm</h1>
                    <input
                        className="input"
                        placeholder={location.state?.book.data.bookName}
                        defaultValue={location.state?.book.data.bookName}
                        onChange={e => setBookName(e.target.value)}
                    />
                    <button className="button" onClick={editBookToDb}>Edit book</button>
                </>
                :
                <>
                    <h1 className="heading">BookForm</h1>
                    <input
                        className="input"
                        placeholder="Book Name"
                        value={bookName}
                        onChange={e => setBookName(e.target.value)}
                    />
                    <button className="button" onClick={sendBookToDb}>Add book</button>
                </>
            }
        </div>
    );
}

export default TextChange;
