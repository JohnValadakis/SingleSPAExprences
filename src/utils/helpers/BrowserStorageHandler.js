const LocalStorageHandler = {
    getItem: (key) => {
        try {
            return JSON.parse(window.localStorage.getItem(key));
        } catch (exception) {
            return null;
        }
    },
    setItem: (key, value) => {
        try {
            if (typeof value === 'object') {
                value = JSON.stringify(value);
            }
            window.localStorage.setItem(key, value);
            return true;
        } catch (exception) {
            return null;
        }
    }
};

export { LocalStorageHandler };
