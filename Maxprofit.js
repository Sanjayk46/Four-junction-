function maxProfit(n) {
   const buildings = [
       { time: 5, earning: 1500, label: "T" }, // Theatre
       { time: 4, earning: 1000, label: "P" }, // Pub
       { time: 10, earning: 3000, label: "C" } // Commercial Park
   ];
  let maxEarning = 0;
  let bestCombos = new Set();

  function MaxPossible(path,currentTime){
   for(let b of buildings){
       const next = currentTime + b.time;
       if(next <= n){
         const developeTime = n - next;
         if(developeTime > 0){
           const  newPath = [...path,b]
           const earnings = calculateEarning(newPath,n)
           if(earnings > maxEarning){
               maxEarning = earnings;
               bestCombos = new Set([comboKeys(newPath)])
           }else if(earnings === maxEarning){
               bestCombos.add(comboKeys(newPath))
           } 
           MaxPossible(newPath,next);
         } 
       }
   }
  }

  function calculateEarning(path, TotalTime){
      let time = 0;
      let earn = 0;
      for(let a of path){
       time += a.time
       const optTime = TotalTime - time;
       if(optTime > 0){
           earn += optTime * a.earning
       }
      } 
      return earn;
  }

  function comboKeys(path){
   let count = {T:0, P:0, C:0};
   for(let c of path){
       count[c.label]++;
   }
   return `T:${count.T},P:${count.P},C:${count.C}`
  }
 
  MaxPossible([],0)

  let result = `Earning :$${maxEarning}\nSolutions:\n`;
  [...bestCombos].forEach((s,i)=>{
   result += `${i + 1}.${s}\n`; 
  });

  return result.trim();
  
}
console.log(maxProfit(49))
console.log(maxProfit(47))
console.log(maxProfit(13))
console.log(maxProfit(8))
console.log(maxProfit(7))
console.log(maxProfit(47))
