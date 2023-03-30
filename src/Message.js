import {useState} from "react";
import {FaRegCommentDots} from "react-icons/fa";
import {FaRegStar} from "react-icons/fa";
import {FaRetweet} from "react-icons/fa";
import {FaStar} from "react-icons/fa";
import {FaTrashAlt} from "react-icons/fa";
import {FaUserPlus} from "react-icons/fa";

import "./styles/message.css"

function Message(props){
    const [starred, setStarred] = useState(false);

    function gererEtoile(evt) {
        setStarred(!starred);
    }

    return(
        <article id={props.idMessage} className="message">
            <img draggable="false" src={props.img} alt={"Avatar de " + props.auteur} />
            <div className="meta-message">
                <h3>{props.auteur}</h3>
                <h4>Le {props.date}</h4>
            </div>
            <p>{props.message}</p>
            <div className="compteurs-message">
                <button className="compteurs-bouton" onClick={(evt) => gererEtoile(evt)}>
                    {starred ? <FaStar /> : <FaRegStar />}
                </button>
                <button className="compteurs-bouton">
                    <FaRetweet />
                </button>
                <button className="compteurs-bouton">
                    <FaRegCommentDots />
                </button>
                {props.idUtilisateur != props.idAuteur && 
                <button className="message-ajout">
                    <FaUserPlus />
                </button>}
                {props.idUtilisateur == props.idAuteur && 
                <button className="message-suppr">
                    <FaTrashAlt />
                </button>}
            </div>
        </article>
    );
}

export default Message;