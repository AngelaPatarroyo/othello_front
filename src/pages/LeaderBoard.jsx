import React from 'react';

export default function LeaderBoard() {
  const usuarios = [
    { username: 'Melbynrojo', wins: 10 },
    { username: 'Alejandra', wins: 8 },
    { username: 'User3', wins: 20 },
    { username: 'User4', wins: 9 },
    { username: 'User5', wins: 18 },
    { username: 'User6', wins: 7 },
    { username: 'User7', wins: 14 },
    { username: 'User8', wins: 11 },
    { username: 'User9', wins: 16 },
    { username: 'User10', wins: 10 },
  ];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Leaderboard</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-800 text-white">
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Username</th>
              <th className="py-3 px-6 text-left">Wins</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="py-2 px-6">{index + 1}</td>
                <td className="py-2 px-6">{user.username}</td>
                <td className="py-2 px-6">{user.wins}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
