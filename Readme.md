# Heart Rate Data Processor

Given heart rate measurements of a patient over several days in JSON file. The script hearRate.js calculates the minimum, maximum, and median heart rates for each date, along with the timestamp of the latest measurement and stores this in a JSON file.

## Features

- Reads heart rate data from a specified JSON file.
- Summarizes data by date, including:
  - Minimum heart rate
  - Maximum heart rate
  - Median heart rate
  - Timestamp of the latest measurement for that date
- Writes summary to a new JSON file.

## Requirements

- Node.js installed on your machine.
- The input JSON file should be structured with an array of objects, each containing timestamps (with startTime and endTime) and beatsPerMinute values.

## Usage

1. Prepare the Input File: Ensure your heart rate data is in a JSON file structured appropriately. Each entry should have timestamps and beatsPerMinute fields.
2. Run the Script:
   - Place your input JSON file in an accessible location.
   - Run the script using Node.js. Pass the input file path and output file path as command line paramters:

```
  node heartRate.js {input_file_path} {output_file_path}
```

## Example Input Format

```json
[
  {
    "beatsPerMinute": 74,
    "timestamps": {
      "startTime": "2023-04-29T20:27:00",
      "endTime": "2023-04-29T20:27:00"
    }
  },
  {
    "beatsPerMinute": 85,
    "timestamps": {
      "startTime": "2023-04-29T20:31:00",
      "endTime": "2023-04-29T20:31:00"
    }
  }
]
```

## Output Format

The script will output a JSON file with an array of objects, each summarizing the heart rate data for a specific date:

```json
[
  {
    "date": "2023-04-29",
    "min": 74,
    "max": 85,
    "median": 79.5,
    "latestDataTimestamp": "2023-04-29T20:31:00"
  }
]
```

## Troubleshooting

- Ensure your input JSON file is properly formatted and located in the correct path.
