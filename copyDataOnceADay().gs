function copyDataOnceADay() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sourceSheet = ss.getSheetByName("test-fb");
  var destinationSheet = ss.getSheetByName("data - by day");
  
  // Get the data range from the source sheet (excluding header row)
  var sourceDataRange = sourceSheet.getRange(2, 1, sourceSheet.getLastRow() - 1, 14);
  var sourceDataValues = sourceDataRange.getValues();

  // Filter out rows that have data in column A (to exclude any blank rows)
  var filteredData = sourceDataValues.filter(function(row) {
    return row[0] !== '';
  });

  // Get the range in the destination sheet where the data will be pasted
  var destinationDataRange = destinationSheet.getRange(destinationSheet.getLastRow() + 1, 2, filteredData.length, 14);

  // Clear the existing content in the destination range before pasting new data
  destinationDataRange.clearContent();

  // Paste the filtered data into the destination sheet
  destinationDataRange.setValues(filteredData);
}
