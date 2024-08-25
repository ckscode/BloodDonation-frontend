import React from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../Components/Loader/Loader';

const Home = () => {
    const {currentUser} = useSelector((state)=>state.users);
    const {loading} = useSelector((state)=>state.loader);
    return (
        <div className='h-screen bg-primary'>
            <h1 className='text-white'>{currentUser.email}</h1>
            {loading&&<Loader/>}
        </div>
    );
};

export default Home;