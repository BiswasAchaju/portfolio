"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { notFound } from "next/navigation";
import { getBlogPostBySlug } from "../_components/Data";

export default function BlogPostPage({ params }) {
  // Use React.use to unwrap the params object
  const [post, setPost] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      // Unwrap params
      const { slug } = await params;

      // Fetch the blog post using the slug
      const blogPost = getBlogPostBySlug(slug);

      // Set the post state or handle not found
      if (blogPost) {
        setPost(blogPost);
      } else {
        notFound();
      }

      setIsLoading(false);
    })();
  }, [params]);

  // Render a loading state if needed
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return <BlogPost post={post} />;
}

export function BlogPost({ post }) {
  return (
    <article className="max-w-4xl mx-auto px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Back to Blog Button */}
        <Link href="/blog">
          <Button variant="ghost" className="mb-8 group mt-8">
            <ArrowLeft className="w-4 h-4 mr-2 transition-transform group-hover:-translate-x-1" />
            Back to Blog
          </Button>
        </Link>

        {/* Featured Image */}
        <div className="relative aspect-[16/9] mb-8 rounded-xl overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Blog Header */}
        <div className="space-y-4 mb-8">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-[#FF014F] uppercase">
              {post.category}
            </span>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {format(new Date(post.date), "MMMM dd, yyyy")}
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold">{post.title}</h1>
          <p className="text-lg text-muted-foreground">{post.excerpt}</p>
        </div>

        {/* Blog Content */}
        <div
          className="prose dark:prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </motion.div>
    </article>
  );
}
