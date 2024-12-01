#!/bin/bash
# e.g. ./run_performance.sh 2024/day1/index.js 

measure_average_time() {
  local command="$1"  # The command passed as an argument
  local total_time=0
  local iterations=10  # Number of iterations
  echo "Running $1 for $iterations iterations."

  for i in $(seq 1 $iterations)
  do
    # Run the command, suppress output, capture timing
    exec 3>&1 4>&2
    result=$( { time bash -c "$command" > /dev/null 2>&1; } 2>&1 )

    # Extract real time in the format 0m0.123s
    real_time=$(echo "$result" | grep real | sed -E 's/real[[:space:]]+//')

    # Extract minutes and seconds, then convert to milliseconds
    minutes=$(echo "$real_time" | sed -E 's/m.*//;s/^0*//')
    seconds=$(echo "$real_time" | sed -E 's/.*m([0-9]+\.[0-9]+)s/\1/')

    minutes=${minutes:-0}  # Default to 0 if no minutes
    time_in_ms=$(echo "($minutes * 60000) + ($seconds * 1000)" | bc)
    total_time=$(echo "$total_time + $time_in_ms" | bc)

   # echo "Execution time: ${time_in_ms} ms"
  done

  # Calculate the average in milliseconds
  local average_time=$(echo "$total_time / $iterations" | bc)
  echo "Average execution time: ${average_time} ms"
  echo ""
}

measure_average_time "node $1" 
measure_average_time "bun run $1" 
