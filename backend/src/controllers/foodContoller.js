import foodSchema from "../models/foodSchema.js";
import path from "path"
import fs from "fs"

export const addFood = async (req, res) => {
  try {

    if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can add food"
      });
    }

    let {
      name,
      description,
      price,
      category,
      foodType,
      ingredients
    } = req.body;

    if (!["veg", "non-veg"].includes(foodType)) {
      return res.status(400).json({
        success: false,
        message: "Invalid food type"
      });
    }

    const alreadyExists = await foodSchema.findOne({
      name,
      category,
      foodType
    });

    if (alreadyExists) {
      return res.status(409).json({
        success: false,
        message: "Food already exists"
      });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No image uploaded"
      });
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/svg+xml"];

    if (!allowedTypes.includes(req.file.mimetype)) {
      return res.status(400).json({
        success: false,
        message: "Invalid file type"
      });
    }


    if (ingredients && typeof ingredients === "string") {
      try {
        ingredients = JSON.parse(ingredients);
      } catch (err) {
        ingredients = ingredients.split(",").map(item => item.trim());
      }
    }

    const imageUrl = `http://localhost:8000/uploads/${req.file.filename}`;

    const food = await foodSchema.create({
      name,
      description,
      price,
      category,
      foodType,
      ingredients,
      image: imageUrl,
      createdBy: req.userId,
      isAvailable: true
    });

    res.status(201).json({
      success: true,
      message: "Food added successfully",
      food
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const getAllFood = async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 4;
        const search = req.query.search || "";
        const sort = req.query.sort || "latest";
        const category = req.query.category;
        const foodType = req.query.foodType;

        const skip = (page - 1) * limit;

        let query = {};

        if (search) {
            query.name = { $regex: search, $options: "i" };
        }

        if (category) {
            query.category = category;
        }

        if (foodType) {
            query.foodType = foodType;
        }
        if (req.role !== "admin") {
            query.isAvailable = true;
        }

        const sortOptions = {
            price_asc: { price: 1 },
            price_desc: { price: -1 },
            rating: { rating: -1 },
            latest: { createdAt: -1 }
        };

        const total = await foodSchema.countDocuments(query);

        const foods = await foodSchema
            .find(query)
            .sort(sortOptions[sort] || sortOptions.latest)
            .skip(skip)
            .limit(limit);

        if (search && foods.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No search result found",
                currentPage: page,
                totalPages: 0,
                totalItems: 0,
                data: []
            });
        }

        res.status(200).json({
            success: true,
            currentPage: page,
            totalPages: Math.ceil(total / limit),
            totalItems: total,
            data: foods
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const getSingleFood = async (req, res) => {
    try {
        const { id } = req.params;

        const food = await foodSchema.findById(id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            });
        }

        if (req.role !== "admin" && !food.isAvailable) {
            return res.status(403).json({
                success: false,
                message: "This food is not available"
            });
        }

        res.status(200).json({
            success: true,
            data: food
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const deleteFood = async (req, res) => {
    try {
        const { id } = req.params;
        if (req.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only admin can delete food"
            });
        }

        const food = await foodSchema.findById(id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            });
        }

        await foodSchema.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: "Food deleted successfully"
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

export const updateFood = async (req, res) => {
  try {

    if (req.role !== "admin") {
      return res.status(403).json({
        success: false,
        message: "Only admin can update food"
      });
    }

    const { id } = req.params;

    const existingFood = await foodSchema.findById(id);

    if (!existingFood) {
      return res.status(404).json({
        success: false,
        message: "Food not found"
      });
    }

    let updateData = { ...req.body };

  
    if (updateData.ingredients && typeof updateData.ingredients === "string") {
      try {
        updateData.ingredients = JSON.parse(updateData.ingredients);
      } catch (err) {
        updateData.ingredients = updateData.ingredients
          .split(",")
          .map(item => item.trim())
          .filter(item => item !== "");
      }
    }

    if (req.file) {

      if (existingFood.image) {
        const fileName = existingFood.image.split("/").pop();
        const oldPath = path.join("uploads", fileName);

        if (fs.existsSync(oldPath)) {
          fs.unlinkSync(oldPath);
        }
      }

      updateData.image = `http://localhost:8000/uploads/${req.file.filename}`;
    }

    const updatedFood = await foodSchema.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    res.status(200).json({
      success: true,
      message: "Food updated successfully",
      data: updatedFood
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

export const changeAvailability = async (req, res) => {
    try {

        if (req.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Only admin can update availability"
            });
        }

        const { id } = req.params;

        const food = await foodSchema.findById(id);

        if (!food) {
            return res.status(404).json({
                success: false,
                message: "Food not found"
            });
        }

        food.isAvailable = !food.isAvailable;

        await food.save();

        res.status(200).json({
            success: true,
            message: "Availability updated",
            data: food
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

