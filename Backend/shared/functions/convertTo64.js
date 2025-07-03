function bufferToBase64(fileBuffer) {
  return `data:image/jpeg;base64,${fileBuffer.toString("base64")}`;
}

module.exports = {
  bufferToBase64,
};
