import CreatePost from "pages/blog/components/CreatePost";
import PostItem from "pages/blog/components/PostItem";
import PostList from "pages/blog/components/PostList";

export default function Blog() {
  return <div className='p-5'>
    <CreatePost/>
    <PostList/>
    
  </div>
}
