import React from 'react';
import { Link } from 'react-router-dom';

const NeighborList = ({ neighborCount, username, neighbors }) => {
  if (!neighbors || !neighbors.length) {
    console.log(NeighborList)
    return <p className='text-center'>{username}, it doesn't look like you have any neighbors yet!</p>;
    
  }

  return (
    <div>
      <h5>
        {username}'s {neighborCount} {neighborCount === 1 ? 'neighbor' : 'neighbors'}
      </h5>
      {neighbors.map(neighbor => (
        <button className="btn w-100 display-block mb-2" key={neighbor._id}>
          <Link to={`/profile/${neighbor.username}`}>{neighbor.username}</Link>
        </button>
      ))}
    </div>
  );
};

export default NeighborList;