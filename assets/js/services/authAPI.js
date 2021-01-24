import axios from "axios";
import jwtDecode from "jwt-decode";
import { LOGIN_API } from "./config";

/**
 * Requete HTTP d'authentification et stockagedu token dans le storage et sur Axios
 * @param {Object} credentials 
 */
function authenticate (credentials) {
   return axios
    .post(LOGIN_API, credentials)
    .then(response => response.data.token)
    .then( token => {
        window.localStorage.setItem("authToken",token);
        setAxiosToken(token);
    })
}
/**
 * supprime la clés authToken dans le localstorage et (Bear) dans Axios
 */
function logout(){
    window.localStorage.removeItem("authToken");
    delete axios.defaults.headers["Authorization"];
}

/**
 * Positionne le token JWT Axios
 * @param {string} token Le token jwt
 */
function setAxiosToken(token){
    axios.defaults.headers["Authorization"] = "Bearer " + token;
}

/**
 * Mise en place lors du chargement de l'application
 */
function setUp(){
    const token = window.localStorage.getItem('authToken');

    if(token){
        const {exp : expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            setAxiosToken(token);
            console.log("Connexion établie avec Axios");
        }
    }
}

/**
 * Permet de savoir si on est authentifié ou pas 
 * @return {boolean}
 */
function isAuthenticated(){
    const token = window.localStorage.getItem('authToken');

    if(token){
        const {exp : expiration} = jwtDecode(token);
        if(expiration * 1000 > new Date().getTime()){
            return true;
        }
        return false;
    }
    return false;
}

export default {
    authenticate,
    logout,
    setUp,
    isAuthenticated
}