const express = require("express");
const authenticateToken = require("../middleware/authMiddleware");
const Watchlist = require("../models/Watchlist");

const router = express.Router();

// ✅ Get User's Watchlist
router.get("/", authenticateToken, async (req, res) => {
  try {
    let watchlist = await Watchlist.findOne({ userId: req.user.userId });
    if (!watchlist) return res.json({ movies: [] });

    res.json(watchlist);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Add Movie to Watchlist
router.post("/add", authenticateToken, async (req, res) => {
  const { id, title, poster_path, vote_average } = req.body;

  try {
    let watchlist = await Watchlist.findOne({ userId: req.user.userId });

    if (!watchlist) {
      watchlist = new Watchlist({ userId: req.user.userId, movies: [] });
    }

    if (watchlist.movies.some((movie) => movie.id === id)) {
      return res.status(400).json({ error: "Movie already in watchlist" });
    }

    watchlist.movies.push({ id, title, poster_path, vote_average });
    await watchlist.save();

    res.json({ message: "Movie added to watchlist!", watchlist });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Remove Movie from Watchlist
router.delete("/remove/:movieId", authenticateToken, async (req, res) => {
  try {
    let watchlist = await Watchlist.findOne({ userId: req.user.userId });
    if (!watchlist) return res.status(404).json({ error: "Watchlist not found" });

    watchlist.movies = watchlist.movies.filter((movie) => movie.id !== parseInt(req.params.movieId));
    await watchlist.save();

    res.json({ message: "Movie removed from watchlist", watchlist });
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
