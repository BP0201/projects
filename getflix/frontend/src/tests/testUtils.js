import React from "react";
import UserContext from "../UserContext";

const demoUser = {
  username: "testUser",
  is_admin: false
};

const demoFavs = [
  {
    id: 1,
    id_type: "movie"
  },
  {
    id: 2,
    id_type: "tv"
  }
];

const UserProvider =
    ({ children, currentUser = demoUser, userFavorites = demoFavs }) => (
    <UserContext.Provider value={{ currentUser, userFavorites }}>
      {children}
    </UserContext.Provider>
);

export { UserProvider };