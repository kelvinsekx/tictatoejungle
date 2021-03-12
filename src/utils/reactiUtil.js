import React from "react";
import {cheat as cheated } from "./func"

function Pronounce({ children, styles }) {
return <span style={{ ...styles }} className="pron">{children}</span>;
}

function Winner({ children }) {
    return <span className="winner">{children}</span>;
    }

function Cheated({ children }) {
return (
    <span
    className="cheated"
    >
    {children}
    </span>
);
}

export function DecideWhatNext(states){
   // console.log(states)
   const {winner, wrongMove, whoIsNext,cheat} = states;
    return wrongMove ? (
            <Pronounce> Kharrma, this is an impossible movement</Pronounce>
          ) : winner ? (
            <Winner>
              <strong>
                {whoIsNext ? "X" : "Y"}!! OSHABLOBLO..you won
              </strong>
            </Winner>
          ) : whoIsNext ? (
            <div>
              <Pronounce styles={{backgroundColor: "yellow", color: "#000"}}>Y, you are next</Pronounce>
      
              {cheat ? <Cheated> X {cheated()}</Cheated> : ""}
            </div>
          ) : (
            <div>
              <Pronounce styles={{backgroundColor: "green", color: "#fff"}}>X, you are Next </Pronounce>
      
              {cheat ? <Cheated> Y {cheated()}</Cheated> : null}
            </div>
          );
}

export function BoxTriangle1() {
    return (
      <div className="recol-container">
        <div className="recol-11"></div>
        <div className="recol-21"></div>
      </div>
    );
  }
  
export function BoxTriangle2() {
    return (
      <div className="recol-container">
        <div className="recol-1"></div>
        <div className="recol-2"></div>
      </div>
    );
  }

export class Box extends React.Component {
    render() {
      return (
        <button
          className={`box ${this.props.className}`}
          onClick={this.props.onClick}
          id={this.props.id}
        >
          {this.props.v}
        </button>
      );
    }
  }