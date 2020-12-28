/**
 *formating json output for <pre> showing
 * @param {string} message
 *
 */

export default function logThis(message) {
  console.log(message);
  // if we pass an Error object, message.stack will have all the details, otherwise give us a string
  if (typeof message === "object") {
    // message = message.stack || objToString(message);
    message = syntaxHighlight(message);
  }

  //insert line
  document.getElementById("log").innerHTML = message;
  // .insertAdjacentHTML("beforeend", message + "<hr>");
}

function syntaxHighlight(json) {
  if (typeof json != "string") {
    json = JSON.stringify(json, undefined, 2);
  }
  json = json
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
  return json.replace(
    /("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,
    function (match) {
      var cls = "number";
      if (/^"/.test(match)) {
        if (/:$/.test(match)) {
          cls = "key";
        } else {
          cls = "string";
        }
      } else if (/true|false/.test(match)) {
        cls = "boolean";
      } else if (/null/.test(match)) {
        cls = "null";
      }
      return '<span class="' + cls + '">' + match + "</span>";
    }
  );
}
