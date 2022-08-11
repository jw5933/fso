const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')

const api = supertest(app) //supertest opens mongoose connection through express app

const helper = require('./testHelper')
const Blog = require('../models/blog')
const User = require('../models/user')
const bcrypt = require('bcrypt')

beforeEach(async () => {
    //happens before each test
    await Blog.deleteMany({})
    // //in order
    // for(let blog in blogs){
    //     const newBlog = new Blog(blog)
    //     await newBlog.save()
    // }

    //in parallel
    blogObjs = helper.blogs.map(blog => new Blog(blog))
    blogPromises = blogObjs.map(blogObj => blogObj.save())
    await Promise.all(blogPromises)

    //reset users
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
})

describe('check initial blog', () => {
    test('blog list is returned as json', async() => {
        await api.get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })
    
    test('blog list identifer is called id', async() => {
        const blogs = await helper.blogsinDB()
        blogs.map(blog => expect(blog.id).toBeDefined())
    })
})

describe('adding blogs', () => {
    test('blog is successfully added', async() => {
        const newBlog = {
            title: "The End Of Social Media",
            author: "Michael Mignano",
            url: "https://medium.com/@mignano/the-end-of-social-media-a88ffed21f86",
            likes: 28,
        }

        const token = await helper.userToken()

        await api.post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogs = await helper.blogsinDB()
        const titles = blogs.map(blog => blog.title)
        expect(blogs).toHaveLength(helper.blogs.length+1)
        expect(titles).toContain("The End Of Social Media")
    })
    
    test('blog with no likes param will default to 0', async() => {
        const newBlog = {
            title: "The End Of Social Media",
            author: "Michael Mignano",
            url: "https://medium.com/@mignano/the-end-of-social-media-a88ffed21f86",
        }
        const token = await helper.userToken()

        await api.post('/api/blogs')
            .set('authorization', `bearer ${token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
    
        const blogs = await helper.blogsinDB()
        const addedBlog = blogs.filter(blog => blog.title === 'The End Of Social Media')
        expect(addedBlog[0].likes).toBeDefined()
        expect(addedBlog[0].likes).toBe(0)
    })
    
    test('blog with no title or author return 400 bad request', async () => {
        const emptyBlog = {
            likes: 20,
        }
        const token = await helper.userToken()

        await api.post('/api/blogs')
            .set('Authorization', `bearer ${token}`)
            .send(emptyBlog)
            .expect(400)
    })

    test('returns 401 if token is invalid', async() => {
        const newBlog = {
            title: "The End Of Social Media",
            author: "Michael Mignano",
            url: "https://medium.com/@mignano/the-end-of-social-media-a88ffed21f86",
            likes: 28,
        }
        const invalidToken = '001jafdj28cjc80'
    
        await api.post('/api/blogs')
            .set('Authorization', `bearer ${invalidToken}`)
            .send(newBlog)
            .expect(401)
    })

})

describe('deleting blogs', () => {
    test('valid delete', async () => {
        const blogsInitial = await helper.blogsinDB()
        const blogToDelete = blogsInitial[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsinDB()
        expect(blogsAtEnd.filter(blog => blog.id === blogToDelete.id)).toHaveLength(0)
    })

    test('invalid id, no delete', async () => {
        const blogsInitial = await helper.blogsinDB()
        const invalidId = '5a422a341b54a676974d17f6'

        await api.delete(`/api/blogs/${invalidId}`)
            .expect(204)

        const blogsAfter = await helper.blogsinDB()
        expect(blogsAfter).toHaveLength(blogsInitial.length)
        expect(blogsAfter.map(blog => blog.title)).toEqual(blogsInitial.map(blog => blog.title))
    })
})

describe('updating likes', () => {
    test('valid id', async () => {
        const blogsInitial = await helper.blogsinDB()
        const blogToUpdate = blogsInitial[0]
        //console.log(blogToUpdate)

        const updateLikes = {"likes": 156}
        await api.put(`/api/blogs/${blogToUpdate.id}`)
            .send(updateLikes)
            .expect(200)

        const blogsAfter = await helper.blogsinDB()
        const blogAfter = blogsAfter.filter(blog => blog.title === blogToUpdate.title)
        //console.log(blogAfter)
        expect(blogAfter[0].likes).toBe(156)
    })

    test('invalid id, no update', async () => {
        const blogsInitial = await helper.blogsinDB()
        const invalidId = '5a422a341b54a676974d17f6'
        const updateLikes = JSON.stringify({"likes": 156})
        await api.put(`/api/blogs/${invalidId}`, updateLikes)
            .expect(204)

        const blogsAfter = await helper.blogsinDB()
        expect(blogsAfter.map(blog => blog.likes)).toEqual(blogsInitial.map(blog => blog.likes))
    })
})


// test('added a blog')

afterAll(() => {
    mongoose.connection.close()
})