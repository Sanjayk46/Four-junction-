function maxProfit(n) {
    const buildings = [
        { time: 5, earning: 1500, label: "T" }, // Theatre
        { time: 4, earning: 1000, label: "P" }, // Pub
        { time: 10, earning: 3000, label: "C" } // Commercial Park
    ];
    
    let dp = new Array(n + 1).fill(0);
    let track = new Array(n + 1).fill(null).map(() => []);
    
    for (let t = 1; t <= n; t++) {
        for (let { time, earning, label } of buildings) {
            if (t >= time) {
                let potentialEarning = dp[t - time] + earning;
                if (potentialEarning > dp[t]) {
                    dp[t] = potentialEarning;
                    track[t] = track[t - time].map(sol => ({ ...sol }));
                    if (track[t].length === 0) {
                        track[t].push({ T: 0, P: 0, C: 0 });
                    }
                    track[t].forEach(sol => sol[label]++);
                } else if (potentialEarning === dp[t]) {
                    let newSolutions = track[t - time].map(sol => ({ ...sol, [label]: sol[label] + 1 }));
                    track[t] = [...track[t], ...newSolutions];
                }
            }
        }
    }
    
    let solutions = track[n].map(sol => `T: ${sol.T} P: ${sol.P} C: ${sol.C}`).join("\n");
    return `Earnings: $${dp[n]}\nSolutions:\n${solutions}`;
}

// Test Cases
console.log(maxProfit(7));  // Test Case 1
console.log(maxProfit(8));  // Test Case 2
console.log(maxProfit(13)); /
