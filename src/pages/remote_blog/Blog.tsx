import CreatePost from "pages/remote_blog/components/CreatePost";
import PostList from "pages/remote_blog/components/PostList";

export default function RemoteBlogLocal() {
  return <div className='p-5'>
    <CreatePost/>
    <PostList/>
  </div>
}
