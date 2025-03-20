import React, { useState, useEffect } from "react";
import BotCard from "./BotCard";

function BotCollection({onAddBot, onBotDelete}) {
  const[bots, setBots]= useState([]); //State to store the list of all bots
//useEffect hook to fetch bot data
 useEffect(()=> {
  fetch('https://bots-db.vercel.app/bots')
  .then(response=>response.json())
  .then(data=> {
    setBots(data);
  })
 }, [])
  
  
  return (
    <div className="ui four column grid">
      <h1>Collection of all bots</h1>
      <div className="row">
        {bots.map((bot)=> (
          <BotCard 
          key={bot.id} 
          bot={bot} 
          onClick={()=>onAddBot(bot)} //Pass the prop to add bot to the army when clicked
          onBotDelete={onBotDelete} //Pass the prop to delete bot from the collection
          />
        ))}
      </div>
    </div>
  );
}

export default BotCollection;
