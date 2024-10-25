const express = require("express");
require("dotenv").config();
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./mongodb");
const Routes = require("./routes/user");
const adminRoutes = require("./routes/admin");
// const initSocket = require("./socket");
const { createServer } = require("http");
const cors = require("cors");

const cheerio = require("cheerio");
const { createCanvas, loadImage } = require("canvas");
const QRCodeReader = require("qrcode-reader");
const Jimp = require("jimp");
const fs = require("fs");

const server = createServer(app);
const port = process.env.PORT;

app.use(express.json({ limit: "100mb" }));
app.use(express.urlencoded({ limit: "100mb", extended: true }));

app.use(cors());

app.use(express.json());
app.use(cookieParser());

app.use("/uploads", express.static("uploads"));

connectDB();
// initSocket(server);

app.get("/", (req, res) => {
  res.send("OK!");
});

app.use("/api", Routes);
app.use("/admin/api", adminRoutes);

app.get("/scrape-base64", async (req, res) => {
  const url = "https://qrstuff.me/gateway/pay/afa8511eb8adb51bf3a44970ac673f96";

  if (!url) {
    return res.status(400).send("No URL provided");
  }

  try {
    // Fetch the webpage content
    const response = await fetch(url);
    const html = await response.text();

    // Load the HTML into Cheerio
    const $ = cheerio.load(html);

    // Assuming the Base64 string is within an <img> tag's src attribute
    const base64String = $("img").attr("src");
    return res.status(200).send({ base64String });
    // decodeQRCodeFromBase64(base64String);
    // if (!base64String || !base64String.startsWith("data:image/")) {
    //   return res.status(404).send("No Base64 image found");
    // }

    // // Remove the data URL prefix
    // const base64Data = base64String.replace(/^data:image\/\w+;base64,/, "");

    // // Convert Base64 string to Buffer
    // const buffer = Buffer.from(base64Data, "base64");

    // // Process the image using sharp to get raw pixel data
    // const { data, info } = await sharp(buffer)
    //   .raw()
    //   .ensureAlpha() // Ensure an alpha channel is present
    //   .toBuffer({ resolveWithObject: true });

    // // Create a QR code reader instance
    // const qr = new QRCodeReader();

    // // Decode the QR code using the raw image data
    // qr.decode(
    //   { data, width: info.width, height: info.height },
    //   (err, value) => {
    //     if (err) {
    //       return res.status(400).send("Could not decode QR code");
    //     }
    //     // Respond with the decoded data
    //     res.send({ qrData: value.result });
    //   }
    // );
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while scraping the webpage");
  }
});

const decodeQRCodeFromBase64 = (base64String) => {
  // Remove the data URL prefix if present
  const base64Data = base64String.replace(/^data:image\/png;base64,/, "");

  // Convert Base64 to binary buffer
  const buffer = Buffer.from(base64Data, "base64");

  // Define the file path for the output PNG
  const filePath = "decoded-qrcode.png";

  // Write the buffer to a PNG file
  fs.writeFile(filePath, buffer, (err) => {
    if (err) {
      console.error("Error writing PNG file:", err);
      return;
    }

    // Use Jimp to read the image from the file
    Jimp.read(filePath)
      .then((image) => {
        // Example: Print image dimensions

        // Optional: Manipulate the image if needed
        // For example, invert colors:
        image.invert().write("inverted-qrcode.png");
      })
      .catch((error) => {
        console.error("Error reading image:", error);
      });
  });
};

server.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
