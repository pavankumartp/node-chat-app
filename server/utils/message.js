var messageGenerator = (from, text)=>{
  return {
    from: from,
    text: text,
    createdAt: new Date().getTime()
  }
};

var messageLocationGenerator = (from, lat, long)=>{
  return {
    from,
    url: `https://maps.google.com?q=${lat},${long}`,
    createdAt: new Date().getTime()
  };
};


module.exports = {messageGenerator, messageLocationGenerator};
