const fs = require("fs");

function processHeartRateData(inputFilePath, outputFilePath) {
  try {
    const data = fs.readFileSync(inputFilePath, "utf8");
    const heartRateData = JSON.parse(data);

    const summaryByDate = heartRateData.reduce(
      (summary, { timestamps, beatsPerMinute }) => {
        const date = timestamps.startTime.split("T")[0];
        if (!summary[date]) {
          summary[date] = {
            measurements: [],
            latestDataTimestamp: timestamps.endTime,
          };
        }
        summary[date].measurements.push(beatsPerMinute);
        if (timestamps.endTime > summary[date].latestDataTimestamp) {
          summary[date].latestDataTimestamp = timestamps.endTime;
        }
        return summary;
      },
      {}
    );

    const outputData = Object.entries(summaryByDate).map(
      ([date, { latestDataTimestamp, measurements }]) => ({
        date,
        min: Math.min(...measurements),
        max: Math.max(...measurements),
        median: calculateMedian(measurements),
        latestDataTimestamp: latestDataTimestamp,
      })
    );

    fs.writeFileSync(
      outputFilePath,
      JSON.stringify(outputData, null, 2),
      "utf8"
    );
    console.log("Data processed and saved successfully.");
  } catch (error) {
    console.error("Error processing heart rate data:", error);
  }
}

function calculateMedian(arr) {
  const sorted = arr.slice().sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  if (sorted.length % 2 !== 0) return sorted[mid];
  else return (sorted[mid - 1] + sorted[mid]) / 2;
}

//Main
const inputFilePath = process.argv[2];
const outputFilePath = process.argv[3];

// Condition to ensure both the arguments are provided
if (inputFilePath && outputFilePath) {
  processHeartRateData(inputFilePath, outputFilePath);
} else {
  console.error("Please provide an input file path and an output file path.");
}
