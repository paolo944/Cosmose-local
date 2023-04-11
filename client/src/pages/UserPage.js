import { FaPalette } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import axios from '../axios.js';
import Banner from '../components/Banner.js';
import CreateMessage from '../components/CreateMessage.js';
import MessagesList from '../components/Messages/MessagesList.js';
import Searchbar from '../components/Searchbar.js';
import User from '../components/Users/User.js';
import UsersList from '../components/Users/UsersList.js';
import UserMeters from '../components/UserMeters.js';
import UserStatsWrapper from '../components/UserStats/UserStatsWrapper.js';

import './styles/userpage.css';

function UserPage(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useParams();
    const [followedList, setFollowedList] = useState(null);
    const [followersList, setFollowersList] = useState(null);
    const [userMessagesList, setUserMessagesList] = useState(null);
    const [user, setUser] = useState(props.currentUser);

    function getUserMessagesList(limit) {
        axios.get(`/messages/${user.login}/${limit}`)
            .then(res => {
                let messages = res.data.messagesList;
                setUserMessagesList(messages);
            })
            .catch(err => console.log(err));
    }

    function getFollowedList(limit) {
        axios.get(`/users/followed/${user.login}/${limit}`)
            .then(res => {
                let followed = res.data.followedList;
                setFollowersList(followed);
            })
            .catch(err => console.log(err));
    }

    function getFollowersList(limit) {
        axios.get(`/users/followers/${user.login}/${limit}`)
            .then(res => {
                let followers = res.data.followersList;
                setFollowersList(followers);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        if (!login) {
            setUser(props.currentUser);
        }
        axios.get(`/users/${login}`)
            .then(res => {
                if (!res.data.user) {
                    navigate('/profil');
                }
                else {
                    setUser(res.data.user);
                    navigate(`/profil/${login}`);
                }
            })
            .catch(err => console.log(err));
    }, [login]);

    useEffect(() => {
        const updatedUserMessagesList = getUserMessagesList(5);
        setUserMessagesList(updatedUserMessagesList);
        const updatedFollowersList = getFollowersList(5);
        setFollowersList(updatedFollowersList);
        const updatedFollowedList = getFollowedList(5);
        setFollowedList(updatedFollowedList);
    }, [location]);

    return (
        <div id='userpage'>
            <header>
                <Link to='/accueil' id='userpage-title'><h1>COSMOSE</h1></Link>
                <Searchbar placeholder={'Rechercher des constellations...'} type={ 'users' } userLogin={ user.login } />
                <div id='userpage-parameters'>
                    <i><FaPalette title='Changer de thème' onClick={ props.switchTheme } /></i>
                    <i><FaSignOutAlt title='Se déconnecter' onClick={ props.logout } /></i>
                </div>
            </header>
            <Banner currentUserLogin={ props.currentUser.login } userLogin={ user.login } />
            <main id='userpage-body'>
                <aside id='userpage-left'>
                    <div id='userpage-info'>
                        <h2 className='pseudo'>{user.firstName} {user.lastName}</h2>
                        <h3 className='login'>@{user.login}</h3>
                    </div>
                    <UserMeters userLogin={ user.login } />
                    <div className='userpage-category'>STATISTIQUES</div>
                    <article className='userpage-userstats'>
                        <UserStatsWrapper />
                    </article>
                    <div className='userpage-category'>VOTRE NEBULEUSE</div>
                    <article id='userpage-followed'>
                        <UsersList users={ followedList } getList={ getFollowedList } />
                    </article>
                    <div className='userpage-category'>CONSTELLATIONS FAVORABLES</div>
                    <article id='userpage-followers'>
                        <UsersList users={ followersList } getList={ getFollowersList } />
                    </article>
                </aside>
                <section id='userpage-right'>
                    <div id='userpage-searchbar'>
                        <Searchbar placeholder={props.currentUser.login === user.login ? 'Naviguer dans votre constellation...' : `Naviguer dans la constellation de ${user.login}...` } type={ 'usermessages' } setList={ setUserMessagesList } userLogin={ user.login } />
                    </div>
                    { props.currentUser.login === user.login && <CreateMessage />}
                    <div id='userpage-messageslist'>
                        <MessagesList messages={ userMessagesList } getList={ getUserMessagesList } currentUserLogin={ props.currentUser.login } />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default UserPage;