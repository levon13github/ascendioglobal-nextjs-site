import { getAllPosts, PostNode } from '../../lib/api'; // <-- UPDATED IMPORT: Also import PostNode
import Image from 'next/image';
import Link from 'next/link';

export default async function HomePage() {
  const posts = await getAllPosts(); // posts is now correctly inferred as PostNode[]

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-8 sm:p-24 bg-gray-50 text-gray-800">
      {/* Header Section */}
      <header className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex mb-12">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
          Ascendio Global - Empowering Entrepreneurs
        </p>
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
          <a
            className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
            href="https://vercel.com?utm_source=create-next-app&utm_medium=appdir-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            By{' '}
            <Image
              src="/vercel.svg"
              alt="Vercel Logo"
              className="dark:invert"
              width={100}
              height={24}
              priority
            />
          </a>
        </div>
      </header>

      {/* Main Content Area */}
      <h1 className="text-4xl sm:text-5xl font-extrabold text-center mb-10 text-blue-700">
        Welcome to Ascendio Global!
      </h1>

      {/* Section to Display Blog Posts */}
      <section className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-xl mb-12">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">
          Latest Insights from Our Blog
        </h2>
        {posts && posts.length > 0 ? (
          <div className="grid gap-6">
            {/* Now, TypeScript knows 'posts' is an array of PostNode, so just type 'post' as PostNode */}
            {posts.map((post: PostNode) => ( // <-- SIMPLIFIED AND CORRECTED TYPE HERE
              <article key={post.slug} className="border-b pb-4 last:border-b-0">
                <h3 className="text-2xl font-semibold text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out">
                  <Link href={`/${post.uri}`}>
                    {post.title}
                  </Link>
                </h3>
                <div
                  className="text-gray-600 mt-2 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: post.excerpt }}
                />
              </article>
            ))}
          </div>
        ) : (
          <p className="text-lg text-gray-500 text-center">
            No blog posts found in WordPress yet. Let's create some content!
          </p>
        )}
      </section>

      {/* Next.js & Tailwind Placeholder Content - Can be removed later */}
      <div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px]">
        {/* You can put your mascot here later! */}
      </div>

      {/* Footer Section */}
      <footer className="mt-12 text-sm text-gray-400 text-center">
        Your journey to financial freedom starts here.&apos;
      </footer>
    </main>
  );
}