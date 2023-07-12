import Post from "./Post";

export default function Articles({ posts }) {
  return (
    <>
      <h2 className="text-xl font-semibold bg-black text-white py-3 px-5">Articles</h2>

      <article className="p-5">
        {posts
          ?.sort((a, b) => b.createdOn - a.createdOn)
          .map((post) => (
            <Post key={post.id} post={post} />
          ))}
        {/* {posts.length === 0 ? <h2 className="min-h-screen text-center">There are no posts...</h2> : ""} */}
      </article>
    </>
  );
}
