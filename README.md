# Facebook Ads Data Automation with Google Apps Script

This repository contains two Google Apps Script files designed to automate the process of importing Facebook Ads insights data into Google Sheets and archiving it for historical analysis.

---

## Scripts Overview

### 1. `importDataFromJSON.gs`
This script fetches Facebook Ads insights data (e.g., impressions, clicks, spend) and writes it into a specific Google Sheet.

#### **How It Works**
- **API Request:** Fetches data from the Facebook Graph API using a URL with parameters such as:
  - `account ID`
  - `access token`
  - Desired fields like campaign, ad set, and ad performance metrics.
- **Pagination:** Handles paginated API responses to ensure all data is fetched.
- **Data Transformation:** Converts the JSON response into a tabular format suitable for Google Sheets.
- **Google Sheets Integration:** Writes the fetched data into a Google Sheet tab named `"test-fb"`, starting from the second row.

#### **Important Notes**
- Replace `{ACCOUNT_ID}` and `{ACCESS_TOKEN}` in the script with your actual credentials.
- Update the sheet name (`"test-fb"`) to match the tab name in your Google Sheet.
- Ensure the Google Sheet is prepared with appropriate column headers.

---

### 2. `copyDataOnceADay.gs`
This script transfers daily data from the `"test-fb"` sheet to another sheet (`"data - by day"`) for maintaining a historical log.

#### **How It Works**
1. **Source Data Extraction:**
   - Reads data from the `"test-fb"` sheet, starting from row 2 (to exclude headers).
   - Filters out any blank rows.
2. **Destination Preparation:**
   - Identifies the next available row in the `"data - by day"` sheet.
   - Clears the destination range before inserting new data.
3. **Data Transfer:**
   - Appends filtered data to the `"data - by day"` sheet.

#### **Important Notes**
- Ensure the `"data - by day"` tab exists in your Google Sheet.
- The script assumes the source sheet (`"test-fb"`) has data fetched by the `importDataFromJSON.gs` script.

---

## How These Scripts Work Together

1. **`importDataFromJSON.gs`:** Fetches and writes fresh Facebook Ads data for "yesterday" into the `"test-fb"` sheet.
2. **`copyDataOnceADay.gs`:** Moves this data to the `"data - by day"` sheet for archival purposes.

### Workflow Example:
- On **Day 1**, run `importDataFromJSON()` to fetch and write data into the `"test-fb"` sheet.
- On **Day 2**, run `copyDataOnceADay()` to archive this data into the `"data - by day"` sheet.

---

## Setup Instructions

### Prerequisites
1. A Google Sheet with two tabs:
   - **`"test-fb"`**: For temporarily storing imported data.
   - **`"data - by day"`**: For archiving daily data.
2. Facebook Ads account credentials to generate:
   - **Account ID**
   - **Access Token**

### Installation Steps
1. Open your Google Sheets file.
2. Go to **Extensions > Apps Script**.
3. Copy-paste the content of both `importDataFromJSON.gs` and `copyDataOnceADay.gs` into separate `.gs` files.
4. Save and deploy the project.

### Trigger Setup
- **`importDataFromJSON()`**: Schedule this function to run daily (e.g., midnight) to fetch the previous day's data.
- **`copyDataOnceADay()`**: Schedule this function to run shortly after the import to archive the data.

---

## Example Usage

- **API Fetch Example:**  
  Run `importDataFromJSON()` to populate your `"test-fb"` sheet with yesterday's Facebook Ads data.

- **Data Transfer Example:**  
  Run `copyDataOnceADay()` to move the data to the `"data - by day"` sheet, ensuring a daily log is maintained.

---

## Potential Enhancements

1. **Error Handling:**
   - Add checks for successful API calls (e.g., handling rate limits, invalid tokens).
   - Ensure both source and destination sheets exist before running.
2. **Dynamic Date Handling:**
   - Allow users to specify custom date ranges or dynamically calculate them.
3. **Logging:**
   - Log successful operations, errors, and the number of rows transferred.

---

Feel free to contribute or raise an issue if you encounter any bugs or have feature requests!

---
