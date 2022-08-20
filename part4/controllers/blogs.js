const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async(request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', {blogs: 0})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    if (!request.user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const body = request.body
    const user = request.user
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id,
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog)
    await user.save()

    response.status(201).json(savedBlog)

    // try{
    //     const savedBlog = await blog.save()
    //     response.status(201).json(savedBlog)
    // }
    // catch(error){next(error)}

})

blogsRouter.delete('/:id', async (request, response, next) => {
    const blog = await Blog.findById(request.params.id)
    const user = request.user
    
    if (blog.user && blog.user.toString() !== user._id.toString()){
        return response.status(401).json({error: 'invalid token or user.'})
    }

    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
})

blogsRouter.put('/:id', async (request, response, next) => {
    if (!request.user) {
        return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog = await Blog.findById(request.params.id)
    if (blog && request.user._id.toString() != blog.user.toString()) {
        return response.status(401).json({error: 'user invalid'})
    }
    const newBlog = {likes: request.body.likes}
    const updatedBlog = await Blog
        .findByIdAndUpdate(request.params.id, newBlog, {new: true})
        .populate('user', {blogs: 0})
    if (updatedBlog) response.json(updatedBlog)
    else response.status(204).end()
})

module.exports = blogsRouter