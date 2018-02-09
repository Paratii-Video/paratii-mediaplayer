import CreatePlayer from "../index";

require("../../styles/demo/app.scss");

CreatePlayer({
  selector: "#player",
  source:
    "https://gateway.paratii.video/ipfs/QmTUsVKyvPqH1UE8GodoL97bcXBAiaqDjYa2bY9Yx7igL1/master.m3u8",
  ipfsHash: "QmTUsVKyvPqH1UE8GodoL97bcXBAiaqDjYa2bY9Yx7igL1",
  plugins: {
    core: []
  }
});
