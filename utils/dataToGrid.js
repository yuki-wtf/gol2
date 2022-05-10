const GRID_SIZE = 32;

function toBinaryStringArray(val) {
  return (
    // Not required: Convert to int ( the 10 is to indicate it should be decimal)
    val
      // Turn integer into a binary string
      .toString(2)
      // Turn it into an array
      .split("")
      // Convert every value to a number
      .map((v) => parseInt(v, 10))
  );
}

export function dataToGrid(data) {
  if ((data && data !== null) || data !== undefined) {
    return Object.keys(data).map((key) => {
      // Start by creating a row with just zeroes
      const emptyRow = Array(GRID_SIZE).fill(0);
      if (data[key] === 0) {
        // Just return the all zeroes row
        return emptyRow;
      }
      // Translate the number into the list of zeroes and ones that should go at the end
      const end = toBinaryStringArray(data[key]);

      return (
        emptyRow
          // Remove the last part of the empty row to make space for the "end" array
          .slice(0, GRID_SIZE - end.length)
          // Then append the "end" array to the end
          .concat(end)
      );
    });
  }
}
