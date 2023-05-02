self.addEventListener("message", (event) => {
  if (event.data.action === "start") {
    const { delay } = event.data;
    self.timer = setInterval(() => {
      self.postMessage({ action: "tick" });
    }, delay);
  } else if (event.data.action === "stop") {
    clearInterval(self.timer);
  }
});
