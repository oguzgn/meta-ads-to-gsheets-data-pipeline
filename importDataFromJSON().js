function importDataFromJSON() {
  // Replace the JSON URL and token with your actual data - {ACCOUNT_ID} and {ACCESS_TOKEN}
  var jsonURL = "https://graph.facebook.com/v17.0/act_{ACCOUNT_ID}/insights?fields=campaign_name,adset_name,ad_name,campaign_id,adset_id,ad_id,impressions,clicks,spend,reach&period=day&date_preset=yesterday&time_increment=1&limit=500&level=ad&access_token={ACCESS_TOKEN}";
  
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("test-fb"); // Change "test-fb" to your sheet name
  
  var allData = [];
  var nextPageURL = jsonURL;
  
  while (nextPageURL) {
    var response = UrlFetchApp.fetch(nextPageURL);
    var jsonData = JSON.parse(response.getContentText());
    var data = jsonData.data;
    nextPageURL = jsonData.paging ? jsonData.paging.next : null;
    
    allData = allData.concat(data);
  }
  
  var startRow = 2;
  var numRows = allData.length;
  var numCols = Object.keys(allData[0]).length;
  var range = sheet.getRange(startRow, 1, numRows, numCols);
  
  var values = [];
  allData.forEach(function (row) {
    var rowData = [];
    for (var key in row) {
      rowData.push(row[key]);
    }
    values.push(rowData);
  });
  
  range.setValues(values);
}
