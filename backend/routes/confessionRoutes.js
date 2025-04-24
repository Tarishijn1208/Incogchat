const express = require("express");
const router = express.Router();
const Confession = require("../models/Confession");

// ✅ Get all confessions
router.get("/all", async (req, res) => {
  try {
    const confessions = await Confession.find().populate("userId", "userId gender");
    console.log("Confessions with populated user:", JSON.stringify(confessions, null, 2));
    res.json(confessions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching confessions" });
  }
});

// ✅ Add a confession
router.post("/add", async (req, res) => {
  const { userId, confessionText } = req.body;

  if (!userId || !confessionText) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const newConfession = new Confession({ 
      userId, 
      confessionText, 
      likes: 0, 
      superLikes: 0 
    });
    
    await newConfession.save();
    res.status(201).json({ message: "Confession added successfully", confession: newConfession });
  } catch (error) {
    res.status(500).json({ message: "Error adding confession", error: error.message });
  }
});


router.get("/user/user_63115", async (req, res) => {
  try {
      const confessions = await Confession.find({ userId: "user_63115" });
      res.json(confessions);
  } catch (error) {
      res.status(500).json({ message: "Error fetching confessions", error });
  }
});





// ✅ Delete a confession by its ID
router.delete("/:id", async (req, res) => {
  try {
    await Confession.findByIdAndDelete(req.params.id);
    res.json({ message: "Confession deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting confession" });
  }
});

// ✅ Like/Unlike Confession
router.post("/:id/like", async (req, res) => {
  const { userId } = req.body;

  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ message: "Confession not found" });
    }

    // Ensure `userId` is treated as a string
    const userIdStr = userId.toString();

    if (confession.likedBy.includes(userIdStr)) {
      // Remove like
      confession.likedBy = confession.likedBy.filter((id) => id.toString() !== userIdStr);
      confession.likes -= 1;
    } else {
      // Add like
      confession.likedBy.push(userIdStr);
      confession.likes += 1;
    }

    await confession.save();
    return res.json({ message: "Like updated!", likes: confession.likes });
  } catch (error) {
    console.error("Error liking:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

// Super-Like Route (same fix applied)
router.post("/:id/superlike", async (req, res) => {
  const { userId } = req.body;

  try {
    const confession = await Confession.findById(req.params.id);
    if (!confession) {
      return res.status(404).json({ message: "Confession not found" });
    }

    const userIdStr = userId.toString();

    if (confession.superLikedBy.includes(userIdStr)) {
      confession.superLikedBy = confession.superLikedBy.filter((id) => id.toString() !== userIdStr);
      confession.superLikes -= 1;
    } else {
      confession.superLikedBy.push(userIdStr);
      confession.superLikes += 1;
    }

    await confession.save();
    return res.json({ message: "Superlike updated!", superLikes: confession.superLikes });
  } catch (error) {
    console.error("Error super-liking:", error);
    return res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
