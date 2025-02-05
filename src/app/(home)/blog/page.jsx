"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Clock } from "lucide-react";


const BlogPosts = [
  {
    id: 1,
    slug: "art-of-responsive-web-design",
    title: "The Art of Responsive Web Design",
    author: "Jane Doe",
    category: "Coding",
    date: "2024-11-15",
    
    image: "/placeholder.svg?height=600&width=1200",
    excerpt:
      "Explore the principles and techniques behind creating responsive websites that look great on any device.",
    content: `
      <p>Responsive web design is an approach to web design that makes web pages render well on a variety of devices and window or screen sizes. Recent work also considers the viewer proximity as part of the viewing context as an extension for RWD. Content, design and performance are necessary across all devices to ensure usability and satisfaction.</p>

      <h2>Key Principles of Responsive Design</h2>

      <ol>
        <li><strong>Fluid Grids:</strong> Use relative units like percentages instead of absolute units like pixels for layout elements.</li>
        <li><strong>Flexible Images:</strong> Images should also adapt to fit different screen sizes and resolutions.</li>
        <li><strong>Media Queries:</strong> Use CSS media queries to apply different styles for different devices and screen sizes.</li>
      </ol>

      <p>By following these principles, designers can create websites that provide an optimal viewing experience across a wide range of devices, from desktop computer monitors to mobile phones.</p>

      <h2>Benefits of Responsive Design</h2>

      <ul>
        <li>Improved user experience across devices</li>
        <li>Better SEO performance</li>
        <li>Easier maintenance (one codebase for all devices)</li>
        <li>Future-proof for new devices and screen sizes</li>
      </ul>

      <p>As the web continues to evolve, responsive design remains a crucial skill for web developers and designers alike. By mastering these techniques, you can ensure your websites are accessible and enjoyable for all users, regardless of their device.</p>
    `,
  },
  {
    id: 2,
    slug: "optimizing-wordpress-performance",
    title: "Optimizing WordPress Performance",
    author: "John Smith",
    category: "WordPress",
    date: "2024-11-10",
   
    image: "/placeholder.svg?height=600&width=1200",
    excerpt:
      "Learn how to speed up your WordPress site with these essential optimization techniques.",
    content: `
      <p>WordPress is a powerful and flexible content management system, but without proper optimization, it can become slow and unresponsive. In this post, we'll explore some key techniques to boost your WordPress site's performance.</p>

      <h2>1. Choose a Good Hosting Provider</h2>
      <p>Your hosting provider plays a crucial role in your site's speed. Opt for a provider that specializes in WordPress hosting and offers features like SSD storage and built-in caching.</p>

      <h2>2. Use a Lightweight Theme</h2>
      <p>A bloated theme can significantly slow down your site. Choose a well-coded, lightweight theme that only includes the features you need.</p>

      <h2>3. Optimize Images</h2>
      <p>Large images are often the biggest culprit in slow page load times. Compress your images before uploading them and consider using a lazy loading plugin.</p>

      <h2>4. Implement Caching</h2>
      <p>Caching can dramatically improve your site's speed by serving static versions of your pages to users. Use a caching plugin like W3 Total Cache or WP Super Cache.</p>

      <h2>5. Minimize Plugins</h2>
      <p>While plugins add functionality, they can also slow down your site. Only use essential plugins and remove any that you're not actively using.</p>

      <p>By implementing these optimization techniques, you can significantly improve your WordPress site's performance, leading to better user experience and improved search engine rankings.</p>
    `,
  },
  // Add more blog posts here...
];

export default function BlogPage() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <h1 className="text-5xl text-black dark:text-white font-bold text-center mb-16">My Blog</h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {BlogPosts.map((post) => (
            <motion.div
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link href={`/blog/${post.slug}`}>
                <div className="relative overflow-hidden rounded-xl bg-card">
                  <div className="aspect-[4/3] relative">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>
                  <div className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-sm font-medium text-[#FF014F] uppercase">
                        {post.category}
                      </span>
                      
                    </div>
                    <h2 className="text-xl font-semibold leading-tight group-hover:text-[#FF014F] transition-colors">
                      {post.title}
                    </h2>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {post.excerpt}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
