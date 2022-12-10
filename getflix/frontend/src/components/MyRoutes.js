import React, { useContext } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Homepage from './Homepage';
import DataList from './DataList';
// import DataPage from './DataPage';
import SignupForm from '../forms/SignupForm';
import LoginForm from '../forms/LoginForm';
import Settings from './Settings';
import Favorites from './Favorites';
import EditForm from '../forms/EditForm';
import AdminPortal from './AdminPortal';
import NotFound from '../other/NotFound';
import UserContext from '../UserContext';

/** MyRoutes
 * All routes in App are listed here.
 * Props are functions defined in App.
 */

const MyRoutes = ({ login, logout, signup, deleteUser, updateUser, addToFavs, removeFromFavs, getFavs, getAllUsers }) => {
  const { currentUser } = useContext(UserContext);

    return (
      <>
        {currentUser ?
        <Routes>
        <Route exact path="/" element={<Homepage add={addToFavs}
            remove={removeFromFavs} />} />
        {/* <Route path="/movies/:id" element={
          <DataPage
            add={addToFavs}
            remove={removeFromFavs}
            getFavs={getFavs}
            category='movie'
          />}
        /> */}
        {/* <Route path="/shows/:id" element={
          <DataPage
            category='tv'
            add={addToFavs}
            remove={removeFromFavs}
            getFavs={getFavs}
          />}
        /> */}
        <Route path="/search" element={
          <DataList
            add={addToFavs}
            remove={removeFromFavs}
            getFavs={getFavs}
          />}
        />
        <Route path="/settings" element={
          <Settings
            deleteUser={deleteUser}
            logout={logout}
          />}
        />
        <Route path="/favorites" element={
          <Favorites
            getFavs={getFavs}
            add={addToFavs}
            remove={removeFromFavs} />} />
        <Route path="/edit/:username" element={<EditForm updateUser={updateUser} />} />
        <Route path="/logout" element={<Navigate replace to="/" />} />
        <Route path="/*" element={<NotFound />} />
        {currentUser.is_admin ?
        <Route path="/adminportal" element={<AdminPortal getAllUsers={getAllUsers} />} />
        :
        ""
        }
        </Routes>
        :
        <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route path="/signup" element={<SignupForm signup={signup} />} />
        <Route path="/login" element={<LoginForm login={login} />} />
        <Route path="/*" element={<Navigate replace to="/" />} />
        </Routes>
        }
      </>
    )
}

export default MyRoutes;