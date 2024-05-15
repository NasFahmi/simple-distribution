const express = require('express');

const postController = require('../controller/post.controller')
const postRouter = express.Router();

postRouter.get('/', postController.getAllPost);

postRouter.post('/', postController.createPost)

postRouter.get('/:slug', postController.getPostBySlug);

postRouter.put('/:id', postController.editPostById);

postRouter.delete('/:id', postController.deletePostById);


module.exports = postRouter;
