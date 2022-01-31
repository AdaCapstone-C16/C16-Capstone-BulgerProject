import React, { useContext, useState, useEffect } from 'react';
import { auth, db } from '../firebase'
import { get, ref, set, child } from "firebase/database";

const AuthContext = React.createContext()

// This useAuth hook allows you to use AuthContext created above
export const useAuth = () => {
    return useContext(AuthContext)
    }

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    const [fName, setFName] = useState(null)
    const [lName, setLName] = useState(null)

    
    const signup = (email, password, fName, lName) => {
        setFName(fName)
        setLName(lName)
        return auth.createUserWithEmailAndPassword(email, password)
        }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        setFName(null)
        setLName(null)
        return auth.signOut()
    }

    // function name(fName, lName) {
    //     const dbRef = ref(db);
    //     get(child(dbRef, `users/${currentUser.uid}`)).then((snapshot) => {
    //         console.log('This user is in the db!')
    //         console.log(snapshot.lName)
    //         console.log(snapshot.fName)
    //     })
    // }


    
    const resetPassword = (email) => {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(()=> {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })
        return unsubscribe
    }, [])

    const value = {currentUser, signup, login, logout, resetPassword, fName, lName }


return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}