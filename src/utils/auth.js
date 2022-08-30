export const getToken = () => {
    return localStorage.getItem("USER_TOKEN") || null;
};

export const setUserLocal = (token) => {
    localStorage.setItem("USER_TOKEN", token);
};

export const removeUserLocal = () => {
    localStorage.removeItem("USER_TOKEN");
};
