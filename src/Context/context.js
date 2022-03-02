import React from 'react';

export default React.createContext({

  username: "User" + Math.floor(Math.random()*(9999-1000+1)+1000).toString(),
  pieceColor: "",
  gameId: null,
  isMultiplayerMode: false,
  setUsername: (username) => {},
  setPieceColor : (color) => {},
  setGameId: (id) => {},
  setMultiplayerMode: (mode) => {}
});