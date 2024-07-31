const dummy = (blogs) => {
  return 1

}

const totalLikes = (blogs) => {
  let totalLikes = 0

  blogs.forEach(blog => {
    totalLikes += blog.likes
  })
  return totalLikes
}

const favoriteBlog = (blogs) => {
  let favoriteBlog = null
  let maxLikes = 0
  blogs.forEach(blog => {
    if(blog.likes > maxLikes){
      favoriteBlog = blog
      maxLikes = blog.likes
    }
  })
  return favoriteBlog
}

const mostBlogs = (blogs) => {
  const authorBlogs = {}
  blogs.forEach(blog=> {
    authorBlogs[blog.author] = (authorBlogs[blog.author] || 0) + 1;
  })
  let mostBlogAuthor = null
  let maxBlogs = 0
  for (const author in authorBlogs){
    if(authorBlogs[author] > maxBlogs){
      mostBlogAuthor = author
      maxBlogs = authorBlogs[author]
    }
  }
  return {
    author:mostBlogAuthor,
    blogs:maxBlogs
  }
}

const mostLikes = (blogs) => {
  const authorLikes = {};

  blogs.forEach(blog => {
    if (blog.author in authorLikes) {
      authorLikes[blog.author] += blog.likes;
    } else {
      authorLikes[blog.author] = blog.likes;   

    }
  });

  let mostLikedAuthor = null;
  let maxTotalLikes = 0;

  for (const author in authorLikes) {
    if (authorLikes[author] > maxTotalLikes) {
      mostLikedAuthor = author;
      maxTotalLikes = authorLikes[author];
    }
  }

  return {
    author: mostLikedAuthor,
    likes: maxTotalLikes
  };
};

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



module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}