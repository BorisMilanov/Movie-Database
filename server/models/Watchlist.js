const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  movies: [
    {
      id: { type: Number, required: true }, // TMDB Movie ID
      title: { type: String, required: true },
      poster_path: { type: String },
      vote_average: { type: Number },
    },
  ],
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);
