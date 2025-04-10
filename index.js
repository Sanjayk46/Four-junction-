 function calculateWater() {

    const input = prompt("Enter Heights  (e.g., 30201, must have 0 between non-zero heights):");

    if (!input) return;

   

    if (!/^\d+$/.test(input)) {

        alert("Input must be a sequence of digits (0-9) only.");

        return;

    }

    const heights = input.split("").map(Number);



    // Check for 0 between any two non-zero heights

    // for (let i = 0; i < heights.length - 1; i++) {

    //     if (heights[i] !== 0 && heights[i+1] !==0) {

    //         alert("Invalid input: There must be a 0 between any two non-zero heights.");

    //         return;

    //     }

    // }



    const n = heights.length;

    if (n === 0) return;



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



    document.getElementById("water-result").textContent = `Units: ${totalWater}`;

   

    drawTable(heights, leftMax, rightMax);

    drawWaterTable(heights, waterLevels);

}



function drawTable(heights, leftMax, rightMax) {

    const tableContainer = document.getElementById("table-container");

    tableContainer.innerHTML = "";

   

    const maxHeight = Math.max(...heights);

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

   

    const maxHeight = Math.max(...heights);

    const table = document.createElement("table");

   

    for (let row = maxHeight; row >= 0; row--) {

        const tr = document.createElement("tr");

       

        for (let col = 0; col < heights.length; col++) {

            const td = document.createElement("td");

            td.style.width = "70px";

            td.style.height = "30px";

            td.style.border = "1px solid black";

           

           if (row < waterLevels[col]) {

                td.style.backgroundColor = "skyblue"; // Show only water levels

            }

            tr.appendChild(td);

        }

        table.appendChild(tr);

    }



    resultContainer.appendChild(table);

}
