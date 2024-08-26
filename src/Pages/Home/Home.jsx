import React from 'react';
import { useSelector } from 'react-redux';


const Home = () => {
    const {currentUser} = useSelector((state)=>state.users);

    return (
        <div className='h-screen '>
            <h1 className='pt-20'>{currentUser.email}</h1>
        </div>
    );
};

export default Home;