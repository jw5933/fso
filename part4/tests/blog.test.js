const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]
const listWithNoLikes = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 0,
    __v: 0
  },
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 0,
    __v: 0
  }
]
const blogs = [
    {
      _id: "5a422a851b54a676234d17f7",
      title: "React patterns",
      author: "Michael Chan",
      url: "https://reactpatterns.com/",
      likes: 7,
      __v: 0
    },
    {
      _id: "5a422aa71b54a676234d17f8",
      title: "Go To Statement Considered Harmful",
      author: "Edsger W. Dijkstra",
      url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
      likes: 5,
      __v: 0
    },
    {
      _id: "5a422b3a1b54a676234d17f9",
      title: "Canonical string reduction",
      author: "Edsger W. Dijkstra",
      url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
      likes: 12,
      __v: 0
    },
    {
      _id: "5a422b891b54a676234d17fa",
      title: "First class tests",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
      likes: 10,
      __v: 0
    },
    {
      _id: "5a422ba71b54a676234d17fb",
      title: "TDD harms architecture",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
      likes: 0,
      __v: 0
    },
    {
      _id: "5a422bc61b54a676234d17fc",
      title: "Type wars",
      author: "Robert C. Martin",
      url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
      likes: 2,
      __v: 0
    }  
]

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })

  test('with multiple blogs, sum of their likes', () => {
      const result = listHelper.totalLikes(blogs)
      expect(result).toBe(36)
  })

  test('with no blogs, equals 0', () => {
      const result = listHelper.totalLikes([])
      expect(result).toBe(0)
  })
})

describe('favourite blog', () => {
  test('when only one blog', () => {
    expect(listHelper.favouriteBlog(listWithOneBlog)).toEqual(listWithOneBlog[0])
  })
  test('when multiple blogs', () => {
    expect(listHelper.favouriteBlog(blogs)).toEqual(blogs[2])
  })
  test('with no blogs', () => {
    expect(listHelper.favouriteBlog([])).toEqual([])
  })
})

describe('most blog', () => {
  test('when only one blog', () => {
    expect(listHelper.mostBlog(listWithOneBlog)).toEqual({author: 'Edsger W. Dijkstra', blogs: 1})
  })
  test('when multiple blogs', () => {
    expect(listHelper.mostBlog(blogs)).toEqual({author: 'Robert C. Martin', blogs: 3})
  })
  test('with no blogs', () => {
    expect(listHelper.mostBlog([])).toEqual({})
  })
})

describe('most likes', () => {
  test('when only one blog', () => {
    expect(listHelper.mostLikes(listWithOneBlog)).toEqual({author: 'Edsger W. Dijkstra', likes: 5})
  })
  test('when multiple blogs', () => {
    expect(listHelper.mostLikes(blogs)).toEqual({author: 'Edsger W. Dijkstra', likes: 17})
  })
  test('when zero likes', () => {
    expect(listHelper.mostLikes(listWithNoLikes)).toEqual({author: 'Edsger W. Dijkstra', likes: 0})
  })
  test('with no blogs', () => {
    expect(listHelper.mostLikes([])).toEqual({})
  })
})