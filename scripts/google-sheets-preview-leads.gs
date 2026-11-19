/**
 * TPN free preview leads → Google Sheet
 *
 * Setup (5 minutes, see TRACKING.md "Free preview leads"):
 *  1. Create a Google Sheet. Extensions → Apps Script. Delete what's there and paste this file.
 *  2. Change SECRET below to a long random string. Put the same value in Vercel as GOOGLE_SHEET_SECRET.
 *  3. Deploy → New deployment → type "Web app".
 *       Execute as: Me      Who has access: Anyone
 *     Authorize when asked, then copy the Web app URL (ends in /exec).
 *  4. Put that URL in Vercel as GOOGLE_SHEET_WEBHOOK_URL and redeploy the site.
 *
 * After editing this script later: Deploy → Manage deployments → edit → Version: New version,
 * so the same /exec URL keeps working.
 */

const SECRET = "CHANGE_ME_TO_A_LONG_RANDOM_STRING";
const SHEET_NAME = "Preview leads";
const TIME_ZONE = "Asia/Kolkata";

const HEADERS = [
  "Submitted at (IST)",
  "Name",
  "Email",
  "Phone",
  "UTM source",
  "UTM medium",
  "UTM campaign",
  "UTM content",
  "UTM term",
  "Page",
  "Referrer",
  "User agent",
];

function doPost(e) {
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || "{}");
    if (data.secret !== SECRET) return json_({ ok: false, error: "unauthorized" });

    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const book = SpreadsheetApp.getActiveSpreadsheet();
      const sheet = book.getSheetByName(SHEET_NAME) || book.insertSheet(SHEET_NAME);
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(HEADERS);
        sheet.setFrozenRows(1);
        sheet.getRange(1, 1, 1, HEADERS.length).setFontWeight("bold");
      }
      sheet.appendRow([
        Utilities.formatDate(new Date(), TIME_ZONE, "yyyy-MM-dd HH:mm:ss"),
        text_(data.name),
        text_(data.email),
        text_(data.phone),
        text_(data.utm_source),
        text_(data.utm_medium),
        text_(data.utm_campaign),
        text_(data.utm_content),
        text_(data.utm_term),
        text_(data.page),
        text_(data.referrer),
        text_(data.userAgent),
      ]);
    } finally {
      lock.releaseLock();
    }
    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

// Keep every value as plain text: "+91 98765…" stays a phone number, and
// anything starting with = + - @ can't run as a formula.
function text_(value) {
  const s = String(value == null ? "" : value).slice(0, 500);
  return /^[=+\-@]/.test(s) ? "'" + s : s;
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
