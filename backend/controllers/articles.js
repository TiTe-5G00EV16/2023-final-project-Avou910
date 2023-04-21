const Joi = require('joi');
const articles = require('../models/articles');

const getArticles = async (req, res) => {
  try {
    const response = await articles.findAll();
    if(response) {
      res.send(response);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const getArticleById = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await articles.findArticleById(id);
    if(response.length === 1) {
      res.send(response[0]);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

const createArticle = async (req, res) => {
  const schema = Joi.object({
    title: Joi.string().min(1).required(),
    price: Joi.string().min(1).required(),
    image: Joi.string(),
    email: Joi.string(),
    userId: Joi.string()


  });

  const { error } = schema.validate(req.body);
  if(error) {
    res.status(400).send(error.details[0].message);
    return;
  }

  const article = {
    title: req.body.title,
    price: req.body.price,
    image: req.body.image,
    email: req.body.email,
    userId: req.body.userId

  }

  try {
    const result = await articles.findByArticle(article);
    if(result.length > 0) {
      res.status(400).send('Article is in the database already');
      return;
    }
    const response = await articles.create(article);
    if(response) {
      article.id = response.insertId;
      res.status(201).send(article);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Something went wrong");
  }
};

const deleteArticle = async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    const response = await articles.deleteById(id);
    if(response) {
      res.status(200).json('Article deleted');
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
};

module.exports = {
  createArticle,
  getArticleById,
  deleteArticle,
  getArticles
};
