import React, { useState, useEffect } from 'react';
import useLocalStorage from './hooks/useLocalStorage';
import BackendAPI from './apis/BackendApi';
import UserContext from './UserContext';
import MyRoutes from './components/MyRoutes'
import Navbar from './components/Navbar';
import Loading from './other/Loading';

import { BrowserRouter } from 'react-router-dom';
import jwt from "jsonwebtoken";

const TOKEN_STORAGE_ID = "capstone-token";

function App() {
  const [infoLoaded, setInfoLoaded] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);
  const [userFavorites, setUserFavorites] = useState([]);

  // console.debug(
  //   "App",
  //   "currentUser =", currentUser,
  //   "token =", token,
  //   "infoLoaded =", infoLoaded
  // )

  useEffect(function loadUserInfo() {
    async function getCurrentUser() {
      if (token) {
        try {
          let { username } = jwt.decode(token);
          BackendAPI.token = token;
          let currentUser = await BackendAPI.getCurrentUser(username);
          setCurrentUser(currentUser)
          setUserFavorites(await getFavs(currentUser.username))
        } catch (e) {
          console.error("App loadUserInfo Error:", e);
          setCurrentUser(null);
        }
      }
      setInfoLoaded(true)
    }
    setInfoLoaded(false);
    getCurrentUser();
  }, [token]);

  // simple logout function to clear localStorage token and currentUser state.
  function logout() {
    setCurrentUser(null);
    setToken(null);
  }

  // call backend to authenticate user
  async function login(data) {
    try {
      let token = await BackendAPI.login(data);
      setToken(token);
      return { success: true }
    } catch (errors) {
      return { success: false, errors }
    }
  }

  // call backend to register new user
  async function signup(data) {
    try {
      const token = await BackendAPI.signup(data);
      setToken(token);
      return { success: true }
    } catch (errors) {
      return { success: false, errors }
    }
  }

  // remove a user from the database
  async function deleteAccount(username) {
    try {
      await BackendAPI.deleteUser(username)
    } catch (e) {
      return { e }
    }
  }


  // update user info in database
  async function updateUser(data) {
    try {
      await BackendAPI.updateUser(data);
      return { success: true }
    } catch (e) {
      return { success: false, e }
    }
  }

  // retrieve all users in database
  async function getAllUsers() {
    try {
      const users = await BackendAPI.getAllUsers();
      return users;
    } catch (e) {
      return { success: false }
    }
  }

  // add to user_favorites table
  async function add(data) {
    const res = await BackendAPI.addToFavorites(data);
    return res;
  }

  // remove from user_favorites table
  async function remove(data) {
    const res = await BackendAPI.removeFromFavorites(data);
    return res;
  }

  // append to userFavorites []
  async function addToFavorites(id, id_type) {
    console.log("adding to favorites:", id, id_type)
    const newFavs = [...userFavorites, { id, id_type }]
    setUserFavorites(newFavs);
    await add({ username: currentUser.username, id, id_type });
}

  // remove from userFavorites []
async function removeFromFavorites(id, id_type) {
    console.log("removing from favorites:", id, id_type)
    const newFavs = [...userFavorites].filter(f => f.id !== id && f.id_type !== id_type)
    setUserFavorites(newFavs);
    await remove({ username: currentUser.username, id, id_type });
}

  // returns all favorites for a user
  async function getFavs(username) {
    const res = await BackendAPI.getAllFavorites(username);
    return res;
  }

  if (!infoLoaded) return <Loading />

  return (
    <div className="App">
      <BrowserRouter>
      <UserContext.Provider value={{ currentUser, setCurrentUser, userFavorites, setUserFavorites }}>
      <Navbar logout={logout} />
      <MyRoutes
        login={login}
        logout={logout}
        signup={signup}
        deleteUser={deleteAccount}
        updateUser={updateUser}
        addToFavs={addToFavorites}
        removeFromFavs={removeFromFavorites}
        getFavs={getFavs}
        getAllUsers={getAllUsers}>
      </MyRoutes>
      </UserContext.Provider>
      </BrowserRouter>
    </div>
  );
}

export default App;
