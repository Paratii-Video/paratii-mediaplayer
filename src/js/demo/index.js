const CreatePlayer = require("../index");

CreatePlayer({
  selector: "#player",
  source:
    "https://gateway.paratii.video" +
    "/ipfs/Qmcw1YXdtmik4KsELVjVW25T5F9EZRVYefATXhbWDYK19t" +
    "/master.m3u8",
  ipfsHash: "Qmcw1YXdtmik4KsELVjVW25T5F9EZRVYefATXhbWDYK19t"
});