import React, { useState } from "react";
import YourBotArmy from "./YourBotArmy";
import BotCollection from "./BotCollection";

function BotsPage() {
  const[army, setArmy]=useState([]); //State to manage list of bots in the user's army

  const addBotToArmy=(newBot)=> {
    if(!army.find((bot)=>bot.id === newBot.id)) {
      setArmy([...army,newBot]); //Adds bot to the army by updating the state
    }
  };

  const removeFromArmy = (botToRemove) => {
    setArmy(army.filter((bot) => bot.id !== botToRemove.id)); //Filters out the bot to remove it from the army
  };

  const handleBotDelete = async (botToDelete) => {
    try {
      // send delete request to the backend
      await fetch(`https://bots-db.vercel.app//bots/${botToDelete.id}`, {
        method: "DELETE",
      });
      // Remove the bot from the army if it's in the army
      removeFromArmy(botToDelete);
    } catch (error) {
      console.error("Error during delete request:", error);
    }
  };


 


return (
    <div>
      <YourBotArmy bots={army} onRemove={removeFromArmy} onBotDelete={handleBotDelete}/> {/* Passing the army bots and the function to remove a bot*/}
      <BotCollection onAddBot={addBotToArmy} onBotDelete={handleBotDelete}/> {/*Passing the function to add a bot to the army and the onDelete prop*/}
    </div>
  )
};

export default BotsPage;
