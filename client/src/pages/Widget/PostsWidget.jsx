import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPosts } from 'state'
import PostWidget from './PostWidget'

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch()

  const token = useSelector((state) => state.token)
  const posts = useSelector((state) => state.posts)

  const getPosts = async () => {
    const res = await fetch('http://localhost:3001/posts', {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })

    const posts = await res.json()

    if (posts) {
      dispatch(setPosts({ posts }))
    }
  }

  const getUserPosts = async () => {
    const res = await fetch(`http://localhost:3001/posts/${userId}/posts`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    })

    const UserPosts = await res.json()

    if (posts) {
      dispatch(setPosts({ posts: UserPosts }))
    }
  }

  useEffect(() => {
    if (isProfile) {
      getUserPosts()
    } else {
      getPosts()
    }
  }, [])

  if (!posts.length) {
    return null
  }

  return (
    <>
      {posts.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          location,
          description,
          postPicturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            location={location}
            description={description}
            postPicturePath={postPicturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        ),
      )}
    </>
  )
}

export default PostsWidget
