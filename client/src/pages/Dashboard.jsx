import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import DashProfile from '../components/DashProfile';
import DashSidebar from '../components/DashSidebar';
import DashPost from '../components/DashPost';
import DashUsers from '../components/DashUsers';
import DashComments from '../components/DashComment';
import DashBoardComponent from '../components/DashBoardComponent';

const Dashboard = () => {

  const location = useLocation();
  const [tab, setTab] = useState('');

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const tabFromUrl = urlParams.get('tab');

    if(tabFromUrl) {
      setTab(tabFromUrl);
    }

  }, [location.search]);

  return (
    <div className='min-h-screen flex flex-col md:flex-row'>
        <div className='md:w-56'>
          {/* sidebar */}
          <DashSidebar />
        </div>
        {/* profile.. */}
        {tab === 'profile' && <DashProfile />}

        {/* Posts */}
        {tab === 'posts' && <DashPost />}

        {/* users.. */}
        {tab === 'users' && <DashUsers />}

        {/* comments */}
        {tab === 'comments' && <DashComments />}

        {/* dashboard comp */}
        {tab === 'dash' && <DashBoardComponent />}
    </div>
  )
}

export default Dashboard