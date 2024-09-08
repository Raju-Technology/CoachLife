import React, { useEffect, useState } from 'react';
import './LeaderBoard.css'; // Importing the CSS file

function LeaderBoard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log(leaderboardData)

  useEffect(() => {
    // Fetching data from the API
    fetch('https://9xs5m7ywyk.execute-api.ap-south-1.amazonaws.com/CoachLife/CL_LeaderBoard')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setLeaderboardData(data);  // Assuming the data is an Array
        setLoading(false);
      })
      .catch((error) => {
        setError(error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="leaderboard-container">
      <div style={{width:'300px',textAlign:'center', marginLeft:'auto', marginRight:'auto'}}>
        <h6>LeaderBoard</h6>
      </div>
      <table className="leaderboard-table">
        <thead>
          <tr>
            <th>Profile Picture</th>
            <th>Kid's Name</th>
            <th>Remaining Points</th>
            <th>Redeemed Points</th>
            <th>Total Points</th>
          </tr>
        </thead>
        <tbody>
          {leaderboardData.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.image} alt={`${item.playerName} profile`} className="profile-pic" />
              </td>
              <td>{item.playerName}</td>
              <td>{item.pointsBalance}</td>
              <td>{item.redeemPoints}</td>
              <td>{item.totalPoints}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default LeaderBoard;
