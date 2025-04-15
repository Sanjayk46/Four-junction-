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

  // Validate all numbers
  // if (heights.some(isNaN)) {
  //   alert("Please enter valid digits only.");
  //   return;
  // }

  // // Check that there's at least one 0 between non-zero heights
  // const firstNonZero = heights.findIndex(h => h !== 0);
  // const lastNonZero = heights.length - 1 - [...heights].reverse().findIndex(h => h !== 0);
  // let zeroFound = false;

  // for (let i = firstNonZero + 1; i < lastNonZero; i++) {
  //   if (heights[i] === 0) {
  //     zeroFound = true;
  //     break;
  //   }
  // }

  // if (!zeroFound) {
  //   alert("There must be at least one 0 between non-zero heights.");
  //   return;
  // }

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

  document.getElementById("water-result").textContent = `Units of Water: ${totalWater}`;

  drawTable(heights, leftMax, rightMax);
  drawWaterTable(heights, waterLevels);
}

function drawTable(heights, leftMax, rightMax) {
  const tableContainer = document.getElementById("table-container");
  tableContainer.innerHTML = "";

  const maxHeight = Math.max(...heights);
  const table = document.createElement("table");

  for (let row = maxHeight; row >= 1; row--) {
    const tr = document.createElement("tr");
    for (let col = 0; col < heights.length; col++) {
      const td = document.createElement("td");

      if (row <= heights[col]) {
        td.classList.add("block");
      } else if (row <= Math.min(leftMax[col], rightMax[col])) {
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

  const maxHeight = Math.max(...heights);
  const table = document.createElement("table");

  for (let row = maxHeight; row >= 1; row--) {
    const tr = document.createElement("tr");

    for (let col = 0; col < heights.length; col++) {
      const td = document.createElement("td");
      td.style.width = "40px";
      td.style.height = "30px";
      td.style.border = "1px solid black";

      if (row <= waterLevels[col]) {
        td.style.backgroundColor = "skyblue";
      }

      tr.appendChild(td);
    }

    table.appendChild(tr);
  }

  resultContainer.appendChild(table);
}
