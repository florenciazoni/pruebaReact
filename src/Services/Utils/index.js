import pako from "pako";

export const Base64ToJson = (base64) => {
  const binary_string = window.atob(base64);
  const len = binary_string.length;
  let bytes = new Uint8Array(len);
  for (var i = 0; i < len; i++) {
    bytes[i] = binary_string.charCodeAt(i);
  }
  const bytesArray = bytes.buffer;

  const json = pako.ungzip(bytesArray, { to: "string" });

  //const j = JSON.parse(pako.inflate(json, { to: "string" }));
  //console.log(JSON.parse(json));
  return JSON.parse(json);
};