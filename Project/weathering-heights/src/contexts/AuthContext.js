import React, { useContext, useState, useEffect } from 'react';
import { auth } from '../firebase'

const AuthContext = React.createContext()

// This useAuth hook allows you to use AuthContext created above
export const useAuth = () => {
    return useContext(AuthContext)
    }

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)
    // const [fName, setFName] = useState(null)
    // const [lName, setLName] = useState(null)
    
    const signup = (email, password, name) => {
        // setFName(fName)
        // setLName(lName)
        return auth.createUserWithEmailAndPassword(email, password).then(function(result) {
            return result.user.updateProfile({displayName: name})
        })
    }

    const login = (email, password) => {
        return auth.signInWithEmailAndPassword(email, password)
    }

    const logout = () => {
        return auth.signOut()
    }
    
    // const syncName = (firstName, lastName) => {
    //     setFName(firstName)
    //     setLName(lastName)
    //     console.log('In the sync func in AUTH, this is the fName and lName state:')
    //     console.log(fName, lName)
    //     return [fName, lName]
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

    // const value = {currentUser, fName, lName, signup, login, logout, resetPassword, syncName }
    const value = {currentUser, signup, login, logout, resetPassword }



return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}