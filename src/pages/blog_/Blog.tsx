import CreatePost from "pages/blog_/components/CreatePost";
import PostList from "pages/blog_/components/PostList";

export default function BlogLocal() {
  return <div className='p-5'>
    <CreatePost/>
    <PostList/>
    
  </div>
}
