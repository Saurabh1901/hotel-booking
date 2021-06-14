const express = require("express");
const mongoose = require("mongoose");
const app = express();

const user = require("./Schema/user.js");
const hotel = require("./Schema/hotel.js");
const booking = require("./Schema/booking.js");

require("dotenv").config();

const PORT = process.env.PORT;

app.use(express.json({ limit: "50MB" }));

app.get("/ping", (req, res) => {
  res.json({ ping: "pong" });
});

app.post("/hotels", async (req, res) => {
  const body = req.body;
  const { name, price, city, country, bannerImage } = body;

  try {
    const response = await hotel.create({
      name,
      price,
      city,
      country,
      bannerImage,
    });
    res.json({ success: true, msg: "", payload: response });
  } catch (e) {
    res.status(401).json({ success: false, msg: "Could not create a hotel!" });
  }
});

app.get("/hotels/:date", async (req, res) => {
  try {
    const date = req.params.date;
    const bookedHotels = await booking.find({
      bookedOn: {
        $gte: new Date(new Date(date).setHours(00, 00, 00)),
        $lt: new Date(new Date(date).setHours(23, 59, 59)),
      },
    });
    let bookedHotelIds = null;
    if (bookedHotels) {
      bookedHotelIds = bookedHotels.map(({ hotel }) => String(hotel));
    }
    const hotelIds = await hotel.find({});
    let availableHotelIds;
    if (bookedHotelIds) {
      availableHotelIds = hotelIds.filter(
        ({ _id }) => !bookedHotelIds.includes(String(_id))
      );
    } else {
      availableHotelIds = hotelIds;
    }
    res.json({ success: true, msg: "", payload: availableHotelIds });
  } catch (e) {
    console.error(e);
    res.status(401).json({ success: false, msg: "Could not get the hotels!" });
  }
});

app.post("/users", async (req, res) => {
  const body = req.body;
  const { username, password } = body;

  try {
    const response = await user.create({ username, password });
    res.json({ success: true, msg: "", payload: response });
  } catch (e) {
    res.status(401).json({ success: false, msg: "Could not create a user!" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const response = await user.find({});
    res.json({ success: true, msg: "", payload: response });
  } catch (e) {
    res.status(401).json({ success: false, msg: "Could not get the users!" });
  }
});

app.post("/users/verify", async (req, res) => {
  const { username, password } = req.body;
  try {
    const response = await user.findOne({ username, password });
    if (response === null) {
      throw new Error("Invalid User");
    }
    res.json({ success: true, msg: "", payload: response });
  } catch (e) {
    res.status(401).status(401).json({ success: false, msg: "Could not verify the user!" });
  }
});

app.get("/bookings/:user", async (req, res) => {
  try {
    const user = req.params.user;
    const bookings = await booking
      .find({ bookedBy: user })
      .sort({ bookedOn: -1 });
    const response = [];
    for (const booking of bookings) {
      const { hotel: hotelId, bookedOn } = booking;
      response.push({
        hotel: await hotel.findOne({ _id: hotelId }),
        bookedOn,
      });
    }
    res.json({ success: true, msg: "", payload: response });
  } catch (e) {
    res.status(401).json({ success: false, msg: "Could not get the bookings by user!" });
  }
});

app.post("/bookings", async (req, res) => {
  const body = req.body;
  const { hotel, bookedBy, bookedOn } = body;

  try {
    const response = await booking.create({ hotel, bookedBy, bookedOn });
    res.json({ success: true, msg: "", payload: response });
  } catch (e) {
    res.status(401).json({ success: false, msg: "Could not book the hotel!" });
  }
});

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.listen(PORT, () => {
  console.debug(`Server is live at http://localhost:${PORT}`);
});
