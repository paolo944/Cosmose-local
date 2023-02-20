import {useState} from "react";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";

import "./styles/connexion.css";
import "./styles/connexion-inscription.css";
import "./styles/fonts.css";

function Connexion(props) {
    const [loginVal, setLoginVal] = useState();
    const [passwordVal, setPasswordVal] = useState();
    const [passwordMask, setPasswordMask] = useState(true);

    function gestionIconeMdp (evt) {
        setPasswordMask(!passwordMask);
    }

    return(
        <main id="main-connexion">
            <h1 className="h1-connexion">S'identifier</h1>
            <form id="form-connexion" method="POST">
                <input type="text" id="login" name="login" placeholder="Pseudo"></input>
                <input type="password" id="mdp" name="mdp" placeholder="Mot de passe"></input><i onClick={(evt) => gestionIconeMdp(evt)}>{passwordMask ? <FaEye /> : <FaEyeSlash />}</i>
                <button onClick={props.connexion}>Se connecter</button>
            </form>
        </main>
    );
}

export default Connexion;