import Post from "./Post";

export default function Articles({ posts }) {
  return (
    <>
      <h2 className="text-xl font-semibold bg-black text-white py-3 px-5">Articles</h2>
      <div className="grid container">
        <article className="p-5 min-h-screen grid">
          {posts
            ?.sort((a, b) => b.createdOn - a.createdOn)
            .map((post) => (
              <Post key={post?.id} post={post} />
            ))}
        </article>
        <div className="w-full grid">Recents</div>
      </div>
    </>
  );
}
