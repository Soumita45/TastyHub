import wishlistSchema from "../models/wishlistSchema.js";

export const addToWishlist = async (req, res) => {
    try {

        if (req.role !== "user") {
            return res.status(403).json({
                message: "Only user allowed"
            });
        }

        const { foodId } = req.body;

        let wishlist = await wishlistSchema.findOne({ user: req.userId });

        if (!wishlist) {
            wishlist = await wishlistSchema.create({
                user: req.userId,
                foods: [foodId]
            });
        } else {

            if (wishlist.foods.includes(foodId)) {
                return res.status(400).json({
                    message: "Already in wishlist"
                });
            }

            wishlist.foods.push(foodId);
            await wishlist.save();
        }

        res.status(200).json({
            message: "Added to wishlist",
            wishlist
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getMyWishlist = async (req, res) => {
  try {

    const wishlist = await wishlistSchema
      .findOne({ user: req.userId })
      .populate("foods");

    res.status(200).json(wishlist);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const removeFromWishlist = async (req, res) => {
  try {

    const { foodId } = req.body;

    const wishlist = await wishlistSchema.findOne({ user: req.userId });

    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found"
      });
    }

    wishlist.foods = wishlist.foods.filter(
      item => item.toString() !== foodId
    );

    await wishlist.save();

    res.status(200).json({
      message: "Removed from wishlist",
      wishlist
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
