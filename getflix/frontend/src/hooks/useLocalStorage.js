import { useState, useEffect } from 'react';

/** useLocalStorage {
 * Used to interact with localStorage.
 * } */

const useLocalStorage = (key, firstValue = null) => {
    const initialValue = localStorage.getItem(key) || firstValue;
    // set item to key value or firstValue
    const [item, setItem] = useState(initialValue);

    useEffect(function setKeyInLocalStorage() {
        // console.debug("useLocalStorage()")
        if (item === null) {
            // setToken(null) removes token from localStorage
            localStorage.removeItem(key);
        } else {
            // otherwise set new value which may be the same value
            localStorage.setItem(key, item);
        }
    }, [key, item])

    return [item, setItem]
}

export default useLocalStorage;