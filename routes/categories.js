const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const express = require("express");
const router = express();

const Category = require("../models/category");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PJ Supermarket Simulation - Documentation Categories",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:4000" }],
  },
  apis: [`/home/elly/Desktop/projects/PJ/server/routes/categories.js`],
};

const swaggerSpecs = swaggerJSDoc(options);

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerSpecs));

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints related to category operations
 *
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         description:
 *           type: string
 *           description: Description of the category
 *
 * /categories:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all categories.
 *     tags: [Categories]
 *     responses:
 *       '200':
 *         description: List of categories retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Category'
 *       '500':
 *         description: Internal server error, unable to retrieve category list
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints related to category operations
 *
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         description:
 *           type: string
 *           description: Description of the category
 *
 * /categories/{id}:
 *   get:
 *     summary: Get a category by ID
 *     description: Retrieve a category by its ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to retrieve
 *     responses:
 *       '200':
 *         description: Category retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '500':
 *         description: Internal server error, category with the given ID does not exist
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints related to category operations
 *
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         icon:
 *           type: string
 *           description: The icon representing the category
 *         color:
 *           type: string
 *           description: The color associated with the category
 *
 * /categories:
 *   post:
 *     summary: Create a new category
 *     description: Create a new category with a name, icon, and color.
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: Category created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Category cannot be created
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints related to category operations
 *
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           description: The unique identifier for the category
 *         name:
 *           type: string
 *           description: The name of the category
 *         icon:
 *           type: string
 *           description: The icon representing the category
 *         color:
 *           type: string
 *           description: The color associated with the category
 *
 * /categories/{id}:
 *   put:
 *     summary: Update a category by ID
 *     description: Update an existing category by its ID with new name, icon, and color.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to update
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Category'
 *     responses:
 *       '200':
 *         description: Category updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Category'
 *       '404':
 *         description: Category with the given ID not found
 */

/**
 * @swagger
 * tags:
 *   name: Categories
 *   description: Endpoints related to category operations
 *
 * /categories/{id}:
 *   delete:
 *     summary: Delete a category by ID
 *     description: Delete a category by its ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID of the category to delete
 *     responses:
 *       '200':
 *         description: Category deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '404':
 *         description: Category with the given ID not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       '400':
 *         description: Bad request, error occurred during deletion
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 error:
 *                   type: string
 */

router.get("/", async (req, res) => {
  const categoryList = await Category.find();

  if (!categoryList) {
    res.status(500).json({ success: false });
  }
  res.status(200).send(categoryList);
});

router.get("/:id", async (req, res) => {
  const category = await Category.findById(req.params.id);

  if (!category) {
    res.status(500).json({
      success: false,
      message: "The category with the given ID not exists",
    });
  }
  res.status(200).send(category);
});

router.post("/", async (req, res) => {
  let category = new Category({
    name: req.body.name,
    icon: req.body.icon,
    color: req.body.color,
  });

  category = await category.save();

  if (!category) return res.status(404).send("Category cannot be created");
  res.send(category);
});

router.put("/:id", async (req, res) => {
  const category = await Category.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color,
    },
    {
      new: true,
    }
  );

  if (!category) return res.status(404).send("Category cannot be created");
  res.send(category);
});

router.delete("/:id", (req, res) => {
  Category.findByIdAndRemove(req.params.id)
    .then((category) => {
      if (category) {
        return res
          .status(200)
          .json({ success: true, message: "Category deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Category cannot find" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

module.exports = router;
