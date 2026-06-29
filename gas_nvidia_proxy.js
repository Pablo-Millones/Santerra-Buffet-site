function doPost(e) {
  var NVIDIA_KEY = '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';

  try {
    var rawBody = e.postData.contents;
    var body = JSON.parse(rawBody);

    var response = UrlFetchApp.fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + NVIDIA_KEY
      },
      payload: JSON.stringify(body),
      muteHttpExceptions: true
    });

    return ContentService
      .createTextOutput(response.getContentText())
      .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({error: err.message}))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

function doGet(e) {
  return ContentService.createTextOutput('ok').setMimeType(ContentService.MimeType.TEXT);
}
