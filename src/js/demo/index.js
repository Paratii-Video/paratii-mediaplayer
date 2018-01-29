import CreatePlayer from "../index";

require("../../styles/demo/app.scss");

CreatePlayer({
  selector: "#player",
  source: "assets/video/ParatiiDemo.mp4",
  ipfsHash: "Qmcw1YXdtmik4KsELVjVW25T5F9EZRVYefATXhbWDYK19t",
  plugins: {
    core: []
  }
});
