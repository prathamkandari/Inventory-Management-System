import React from 'react';
import {
  FaBehance,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
  FaSketch,
  FaHome,
  FaUserFriends,
  FaFolderOpen,
  FaLine,
  FaWpforms,
} from 'react-icons/fa';
export const links = [
  {
    id: 5,
    url: '/dashboard',
    text: 'dashboard',
    icon: < FaHome />,
  },
  {
    id: 1,
    url: '/inventory',
    text: 'inventory',
    icon: < FaWpforms/>,
  },
  {
    id: 2,
    url: '/stocklevels',
    text: 'Stock Levels',
    icon: <FaFolderOpen />,
  },
  {
    id: 4,
    url: '/client',
    text: 'Client',
    icon: <FaUserFriends />,
  },
  // {
  //   id: 5,
  //   url: '/login',
  //   text: 'Login',
  //   icon: <FaHome />,
  // },
  // {
  //   id: 4,
  //   url: '/calendar',
  //   text: 'calendar',
  //   icon: <FaCalendarAlt />,
  // },

];

export const social = [
  {
    id: 1,
    url: 'https://www.twitter.com',
    icon: <FaFacebook />,
  },
  {
    id: 2,
    url: 'https://www.twitter.com',
    icon: <FaTwitter />,
  },
  {
    id: 3,
    url: 'https://www.twitter.com',
    icon: <FaLinkedin />,
  },
  {
    id: 4,
    url: 'https://www.twitter.com',
    icon: <FaBehance />,
  },
  {
    id: 5,
    url: 'https://www.twitter.com',
    icon: <FaSketch />,
  },
];
