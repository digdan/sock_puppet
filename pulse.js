setInterval(() => {
  console.log(JSON.stringify({ now: Date.now() }));
}, 5000);

process.stdin.on("data", (chunk) => {
  console.log(chunk.toString());
});
