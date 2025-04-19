
function calculateWater() {
  const input = prompt("Enter Heights (e.g., 0,4,0,0,6 or 040006):");




 

  if (!input) return;




 

  // Normalize input: remove spaces and split by comma or use each digit




 

  let cleaned = input.replace(/\s+/g, '');




 

  let heights = [];




 

  if (cleaned.includes(',')) {




 

    heights = cleaned.split(',').map(Number);




 

  } else {




 

    heights = cleaned.split('').map(Number);




 

  }




 

  const n = heights.length;




 

  let leftMax = new Array(n).fill(0);




 

  let rightMax = new Array(n).fill(0);




 

  let waterLevels = new Array(n).fill(0);




 

  let totalWater = 0;




 

  leftMax[0] = heights[0];




 

  for (let i = 1; i < n; i++) {




 

    leftMax[i] = Math.max(leftMax[i - 1], heights[i]);




 

  }




 

  rightMax[n - 1] = heights[n - 1];




 

  for (let i = n - 2; i >= 0; i--) {




 

    rightMax[i] = Math.max(rightMax[i + 1], heights[i]);




 

  }




 

  for (let i = 0; i < n; i++) {




 

    waterLevels[i] = Math.max(0, Math.min(leftMax[i], rightMax[i]) - heights[i]);




 

    totalWater += waterLevels[i];




 

  }


 

if(totalWater <10){


 

  document.getElementById("water-result").textContent = `Output: ${totalWater} Unit`;


 

}else{


 

  document.getElementById("water-result").textContent = `Output: ${totalWater} Units`;


 

}





 

  const combinedHeights = heights.map((h, i) => h + waterLevels[i]);




 

  const maxTableHeight = Math.max(...combinedHeights);




 

  drawTable(heights, leftMax, rightMax, maxTableHeight);




 

  drawWaterTable(heights, waterLevels, maxTableHeight);




 

}




 

function drawTable(heights, leftMax, rightMax) {


 

  const tableContainer = document.getElementById("table-container");


 

  tableContainer.innerHTML = "";

  console.log(heights);



 

  const maxHeight = Math.max(...heights);

  console.log(maxHeight);

  const table = document.createElement("table");




 

  for (let row = maxHeight; row >= 0; row--) {


 

      const tr = document.createElement("tr");


 

      for (let col = 0; col < heights.length; col++) {


 

          const td = document.createElement("td");




 

          if (row < heights[col]) {


 

              td.classList.add("block");


 

          } else if (row < Math.min(leftMax[col], rightMax[col])) {


 

              td.classList.add("water");


 

          }




 

          tr.appendChild(td);


 

      }


 

      table.appendChild(tr);


 

  }




 

  tableContainer.appendChild(table);


 

}




 

function drawWaterTable(heights, waterLevels) {


 

  const resultContainer = document.getElementById("result-table-container");


 

  resultContainer.innerHTML = "";




 

  const maxHeight =

  Math.max(...heights);


 

  const table = document.createElement("table");




 

  for (let row = maxHeight; row >= 0; row--) {


 

      const tr = document.createElement("tr");




 

      for (let col = 0; col < heights.length; col++) {


 

          const td = document.createElement("td");


 

          td.style.border = "1px solid black";


 

          td.style.width = "80px";


 

          td.style.height = "20px";




 

          if (row < heights[col] + waterLevels[col] && row >= heights[col])  {


 

              td.style.backgroundColor = "skyblue";


 

          }




 

          tr.appendChild(td);


 

      }




 

      table.appendChild(tr);


 

  }




 

  resultContainer.appendChild(table);


 

}

