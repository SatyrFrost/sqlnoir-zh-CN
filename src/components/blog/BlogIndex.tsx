import { Link } from "react-router-dom";
import { Calendar, Clock, Home } from "lucide-react";
import { BsIncognito } from "react-icons/bs";
import { useEffect } from "react";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  slug: string;
  heroImage: string;
}

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "5 Best SQL Games to Master Database Skills in 2025",
    excerpt:
      "Skip the boring textbooks. These 5 SQL games teach database queries through detective stories, island survival, and murder mysteries.",
    date: "2025-05-28",
    readTime: "12 min read",
    author: "Hristo Bogoev",
    slug: "games-to-learn-sql",
    heroImage:
      "https://miro.medium.com/v2/resize:fit:1400/format:webp/1*6pp6SQWVUJREwSGgwRk6aA.png",
  },
];

export function BlogIndex() {
  useEffect(() => {
    // Update document title for blog index
    document.title =
      "SQL Game Tutorials & Tips - Detective's Journal | SQL Noir";

    return () => {
      // Reset title when component unmounts
      document.title = "SQL Noir";
    };
  }, []);

  return (
    <div className="min-h-screen bg-amber-50/50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="flex items-center gap-3 text-amber-900 hover:text-amber-700 transition-colors"
          >
            <BsIncognito className="w-6 h-6" />
            <span className="text-lg font-detective">SQL Noir</span>
          </Link>
          <h1 className="text-2xl font-detective text-amber-900">
            Detective's Journal
          </h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-detective text-amber-900 mb-4">
            Detective's Journal
          </h2>
          <p className="text-xl text-amber-800 max-w-2xl mx-auto">
            SQL tips, game reviews, and database tutorials.
          </p>
        </div>

        <div className="space-y-8">
          {BLOG_POSTS.map((post) => (
            <article key={post.id} className="group">
              <Link to={`/blog/${post.slug}`} className="block">
                <div
                  className="bg-white/90 rounded-lg overflow-hidden shadow-lg border border-amber-200 
                              hover:shadow-xl transition-all duration-300 hover:scale-[1.02]"
                >
                  {/* Hero Image */}
                  <div className="aspect-[2/1] overflow-hidden">
                    <img
                      src={post.heroImage}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-amber-700 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(post.date).toLocaleDateString("en-US", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{post.readTime}</span>
                      </div>
                      <span>By {post.author}</span>
                    </div>

                    <h3 className="text-2xl font-bold text-amber-900 mb-4 group-hover:text-amber-700 transition-colors">
                      {post.title}
                    </h3>

                    <p className="text-amber-800 text-lg leading-relaxed">
                      {post.excerpt}
                    </p>

                    <div className="mt-6">
                      <span
                        className="inline-flex items-center px-4 py-2 bg-amber-800/90 text-amber-100 
                                     rounded-lg font-medium group-hover:bg-amber-700/90 transition-colors"
                      >
                        Read Full Article →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-amber-100/80 backdrop-blur-sm border-t border-amber-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 py-8 text-center">
          <p className="text-amber-800 font-detective mb-4">
            Keep investigating with SQL Noir - where mysteries meet databases.
          </p>
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-800/90 hover:bg-amber-700/90 
                     text-amber-100 rounded-lg font-detective transition-colors"
          >
            <Home className="w-4 h-4" />
            Back to Game
          </Link>
        </div>
      </footer>
    </div>
  );
}
