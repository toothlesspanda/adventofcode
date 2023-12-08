const {
  DynamicThreadPool,
  FixedThreadPool,
  PoolEvents,
  availableParallelism,
} = require("poolifier")

// Function to simulate processing a chunk of values
const processChunk = async (start, end) => {
  // Replace this with your actual processing logic
  for (let i = start; i <= end; i++) {
    // Perform some processing on the value i
    console.log(`Processing value: ${i}`)
    // Simulate a delay (replace with actual processing time)
    await new Promise((resolve) => setTimeout(resolve, 100))
  }
}

// Function to iterate over objects and create chunks
const processObjects = async (objects) => {
  // Create a pool of workers with a maximum of 4 workers
  const pool = new Worker({ maxPoolSize: 4 })

  // Iterate over each object
  for (const obj of objects) {
    const { startingValue, range } = obj

    // Calculate the number of chunks based on the range
    const chunks = Math.ceil(range / 1000) // Adjust the chunk size as needed

    // Create and dispatch tasks to the pool for parallel processing
    for (let i = 0; i < chunks; i++) {
      const start = startingValue + i * 1000
      const end = Math.min(start + 999, startingValue + range)

      // Dispatch task to the pool
      pool.addTask(processChunk, start, end)
    }

    // Wait for all tasks related to the current object to complete
    await pool.waitForAll()
  }

  // Close the pool when done
  await pool.close()
}

// Example array of objects
const objectsArray = [
  { startingValue: 1, range: 5000 },
  { startingValue: 6000, range: 3000 },
  // Add more objects as needed
]

// Run the main processing function
processObjects(objectsArray)
  .then(() => {
    console.log("All tasks completed successfully")
  })
  .catch((error) => {
    console.error("Error:", error)
  })
