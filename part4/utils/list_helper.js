const _ = require('lodash')

const dummy = (blogs) => {
    return(1)
}

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favouriteBlog = (blogs) => {
    return blogs.length === 0 ? [] : blogs.reduce((fav, blog) => fav.likes > blog.likes ? fav: blog, {likes: -1})
}

const mostBlog = (blogs) => {
    const ag = _.countBy(blogs, 'author')
    const max = blogs.length === 0 ? {} : 
        Object.entries(ag).reduce((most, [key, val]) => most.blogs >= val ? most : {author: key, blogs: val}, {blogs:0})
    return max
}

const mostLikes = (blogs) => {
    const ag = _.groupBy(blogs, 'author')
    const max = blogs.length === 0 ? {} : Object.entries(ag).reduce((most, [key, val]) => {
        const likes = val.reduce((sum, blog) => sum + blog.likes, 0)
        const max = most.likes >= likes ? most : {author: key, likes: likes}
        return max
    }, {likes: -1})
    return max
}

module.exports = {dummy, totalLikes, favouriteBlog, mostBlog, mostLikes}