const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const multer = require("multer");

const Product = require("../models/product");
const Category = require("../models/category");
const Supplier = require("../models/supplier");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];
    let uploadError = new Error("Invalid Image Type");
    if (isValid) {
      uploadError = null;
    }
    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const fileName = file.originalname.split("").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${fileName}-${Date.now()}.${extension}`);
  },
});

const upload = multer({ storage: storage });

const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "PJ Supermarket Simulation",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:4000" }],
  },
  apis: [`/home/elly/Desktop/projects/PJ/server/routes/orders.js`],
};

const swaggerSpecs = swaggerJSDoc(options);

router.use("/api-docs", swaggerUi.serve);
router.get("/api-docs", swaggerUi.setup(swaggerSpecs));

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: Endpoints related to product operations
 *
 * /products:
 *   get:
 *     summary: Get products with optional category filtering
 *     description: Retrieve a list of products with an optional filter by categories.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: categories
 *         schema:
 *           type: array
 *           items:
 *             type: string
 *         style: form
 *         explode: true
 *         description: Filter products by one or more categories (comma-separated)
 *     responses:
 *       '200':
 *         description: List of products retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Product'
 *       '500':
 *         description: Internal server error, unable to retrieve product list
 */

router.get("/", async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(",") };
  }

  const productList = await Product.find(filter).populate("category");
  // const productList = await Product.find(filter).select('name image');
  if (!productList) {
    res.status(500), json({ success: false });
  }
  res.status(200).send(productList);
});

router.get("/:id", async (req, res) => {
  const product = await Product.findById(req.params.id).populate("category");

  if (!product) {
    res.status(500).json({
      success: false,
      message: "The product with the given ID not exists",
    });
  }
  res.status(200).send(product);
});

router.post("/", upload.single("image"), async (req, res) => {
  // const { name, description, richDescription, brand, price } = req.body.name;
  const { name, description, richDescription, brand, price } = req.body;
  if (!mongoose.isValidObjectId(req.params.id)) {
    return res.status(400).send("Invalid Product ID");
  }

  const category = await Category.findById(req.body.category);
  if (!category) {
    return res.status(400).send("Invalid Category");
  }

  const file = req.file;
  if (!file) {
    return res.status(400).send("No image in the request");
  }

  const fileName = file.filename;
  const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

  // Validate supplier email
  const supplierEmail = req.body.supplierEmail;

  // Check if the supplier email already exists in the database
  let supplier = await Supplier.findOne({ email: supplierEmail });
  if (!supplier) {
    return res.status(404).send("Supplier not found");
  }

  let product = new Product({
    name,
    description,
    richDescription,
    image: `${basePath}${fileName}`,
    brand,
    price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured,
    supplierID: supplier._id,
  });

  product = await product.save();

  if (!product) {
    return res.status(500).send("Product cannot be created");
  }

  res.send(product);
});

// ------------------------------------------------------------------------

// router.post("/", upload.single("image"), async (req, res) => {
//   if (!mongoose.isValidObjectId(req.params.id)) {
//     res.status(400).send("Invalid Product ID");
//   }

//   const category = await Category.findById(req.body.category);
//   if (!category) return res.status(400).send("Invalid Category");

//   const file = req.file;
//   if (!file) return res.status(400).send("No image in the request");

//   const fileName = file.filename;
//   const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

//   let product = new Product({
//     name: req.body.name,
//     description: req.body.description,
//     richDescription: req.body.richDescription,
//     image: `${basePath}${fileName}`,
//     brand: req.body.brand,
//     price: req.body.price,
//     category: req.body.category,
//     countInStock: req.body.countInStock,
//     rating: req.body.rating,
//     numReviews: req.body.numReviews,
//     isFeatured: req.body.isFeatured,

//   });

//   product = await product.save();

//   if (!product) return res.status(500).send("Product cannot be created");

//   res.send(product);
// });

// ----------------------------------------------------------------------------------------

// router.post("/", upload.single("image"), async (req, res) => {
//   if (!mongoose.isValidObjectId(req.params.id)) {
//     return res.status(400).send("Invalid Product ID");
//   }

//   const category = await Category.findById(req.body.category);
//   if (!category) {
//     return res.status(400).send("Invalid Category");
//   }

//   const file = req.file;
//   if (!file) {
//     return res.status(400).send("No image in the request");
//   }

//   const fileName = file.filename;
//   const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;

//   // Validate supplier email
//   const supplierEmail = req.body.supplierEmail;
//   // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//   // if (!emailRegex.test(supplierEmail)) {
//   //   return res.status(400).send("Invalid Supplier Email");
//   // }

//   // Check if the supplier email already exists in the database
//   const existingProduct = await Supplier.findOne({ supplierEmail });
//   if (existingProduct) {
//     return res.status(400).send("Supplier Email already exists");
//   }

//   let product = new Product({
//     name: req.body.name,
//     description: req.body.description,
//     richDescription: req.body.richDescription,
//     image: `${basePath}${fileName}`,
//     brand: req.body.brand,
//     price: req.body.price,
//     category: req.body.category,
//     countInStock: req.body.countInStock,
//     rating: req.body.rating,
//     numReviews: req.body.numReviews,
//     isFeatured: req.body.isFeatured,
//     supplierEmail: supplierEmail,
//   });

//   product = await product.save();CATEGORYADD SUPPLIERADD

//   if (!product) {
//     return res.status(500).send("Product cannot be created");
//   }

//   res.send(product);
// });

router.put("/:id", async (req, res) => {
  const category = await Category.findById(req.body.category);
  if (!category) return res.status(400).send("Invalid Category");

  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured,
      supplier: req.body.supplier,
    },
    {
      new: true,
    }
  );

  if (!product) return res.status(500).send("Product cannot be updated");
  res.send(product);
});

router.delete("/:id", (req, res) => {
  Product.findByIdAndRemove(req.params.id)
    .then((product) => {
      if (product) {
        return res
          .status(200)
          .json({ success: true, message: "Product deleted successfully" });
      } else {
        return res
          .status(404)
          .json({ success: false, message: "Product cannot find" });
      }
    })
    .catch((err) => {
      return res.status(400).json({ success: false, error: err });
    });
});

router.get("/get/count", async (req, res) => {
  const productCount = await Product.countDocuments((count) => count);
  if (!productCount) {
    res.status(500), json({ success: false });
  }
  res.status(200).send({
    productCount: productCount,
  });
});

router.get("/get/featured/:count", async (req, res) => {
  const count = req.params.count ? req.params.count : 0;
  const products = await Product.find({ isFeatured: true }).limit(+count);
  if (!products) {
    res.status(500), json({ success: false });
  }
  res.status(200).send(products);
});

router.put(
  "/gallery-images/:id",
  upload.array("images", 10),
  async (req, res) => {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).send("Invalid Product ID");
    }

    const files = req.files;
    let imagesPaths = [];
    const basePath = `${req.protocol}://${req.get("host")}/public/uploads/`;
    if (files) {
      files.map((file) => {
        imagesPaths.push(`${basePath}${file.fileName}`);
      });
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        image: imagesPaths,
      },
      {
        new: true,
      }
    );

    if (!product) return res.status(500).send("Product cannot be updated");
    res.send(product);
  }
);

module.exports = router;
