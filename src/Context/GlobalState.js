import React, { Component } from 'react';
import Context from './context';



class GlobalState extends Component{
    
    
    state = {
        username: "User" + Math.floor(Math.random()*(9999-1000+1)+1000).toString(),
        pieceColor: "",
        gameId: null,
        isMultiplayerMode: false,
    }


    setUsername = (username) => {
        let newState = {...this.state};
        newState.username = username;
        this.setState(newState)
    };

    setPieceColor = (color) => {
        console.log("Set piece color called")
        let newState = {...this.state};
        newState.pieceColor = color;
        this.setState(newState)
    };

    setGameId = (id) => {
        let newState = {...this.state};
        newState.gameId = id;
        this.setState(newState)
    };

    setMultiplayerMode = (mode) => {
        let newState = {...this.state};
        newState.isMultiplayerMode = mode;
        this.setState(newState)
    };
    
    render(){
        return (
            <Context.Provider 
            value={{
                username:this.state.username,
                pieceColor:this.state.pieceColor,
                gameId:this.state.gameId,
                isMultiplayerMode:this.state.isMultiplayerMode,
                setUsername: this.setUsername,
                setPieceColor: this.setPieceColor,
                setGameId: this.setGameId,
                setMultiplayerMode: this.setMultiplayerMode,
            }}
            >
                {this.props.children}
            </Context.Provider>
        );
    }
}

export default GlobalState;
