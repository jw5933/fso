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

blogsRouter.post('/', async (request, response, next) => {
    const body = request.body
    const user = request.user
    
    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user._id,
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
    const blog = {likes: request.body.likes}
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, {new: true})
    if (updatedBlog) response.json(updatedBlog)
    else response.status(204).end()
})

module.exports = blogsRouter