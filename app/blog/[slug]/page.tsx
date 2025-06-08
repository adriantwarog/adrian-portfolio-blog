import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import { AudioPlayer } from "@/components/audio-player"
import { AudioGenerator } from "@/components/audio-generator"
import type { Metadata } from "next"


const blogPosts = {
  "react-server-components": {
    title: "Understanding React Server Components",
    description:
      "A deep dive into React Server Components and how they're changing the way we build React applications.",
    image: "/placeholder.svg?height=400&width=800",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "Next.js", "Server Components"],
    content: `Understanding React Server Components. React Server Components represent a paradigm shift in how we think about React applications. They allow us to render components on the server, reducing the JavaScript bundle size and improving performance.
	
	
Very Cool!`,
  },
  "vps-hosting-guide": {
    title: "Complete Guide to VPS Hosting",
    description:
      "Everything you need to know about choosing, setting up, and managing your own VPS for web development.",
    image: "/placeholder.svg?height=400&width=800",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["DevOps", "Hosting", "Linux"],
    content: `
# Complete Guide to VPS Hosting. Virtual Private Servers VPS offer the perfect balance between shared hosting and dedicated servers. This guide will walk you through everything you need to know. VPS is a virtualized server that mimics a dedicated server within a shared hosting environment. When selecting a VPS provider, consider performance, network, support, pricing, and scalability. Setting up your VPS involves initial server setup and security hardening. Regular maintenance includes monitoring resource usage, keeping software updated, regular backups, and security audits. VPS hosting gives you the power and flexibility to run your applications exactly how you want them.
    `,
  },
  "typescript-best-practices": {
    title: "TypeScript Best Practices for 2024",
    description: "Modern TypeScript patterns and practices that will make your code more maintainable and type-safe.",
    image: "/placeholder.svg?height=400&width=800",
    date: "2024-01-05",
    readTime: "10 min read",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
    content: `TypeScript Best Practices for 2024. TypeScript continues to evolve, and with it, our best practices. Here are the most important patterns and practices for writing maintainable TypeScript code in 2024. Use interfaces for object shapes and leverage union types. TypeScript's built-in utility types are powerful for picking specific properties and making properties optional or required. Generic constraints help create flexible yet type-safe functions. Always enable strict mode in your TypeScript configuration. Use proper typing in your tests for better code quality. Following these practices will make your TypeScript code more robust, maintainable, and enjoyable to work with.`,
  },
}

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const slug = (await params).slug
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    return {
      title: "Post Not Found",
    }
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}

export default async function BlogPost({ params }: Props) {
  const slug = (await params).slug
  const post = blogPosts[slug as keyof typeof blogPosts]

  if (!post) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </header>

      {/* Article */}
      <article className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Hero Image */}
        <div className="aspect-video relative overflow-hidden rounded-lg mb-8">
          <Image src={post.image || "/placeholder.svg"} alt={post.title} fill className="object-cover" priority />
        </div>

        {/* Article Header */}
        <header className="mb-8">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
            <Calendar className="h-4 w-4" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
            <Clock className="h-4 w-4 ml-4" />
            <span>{post.readTime}</span>
          </div>

          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          <p className="text-xl text-muted-foreground mb-6">{post.description}</p>

          <div className="flex flex-wrap gap-2 mb-6">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Audio Generator */}
          <AudioGenerator text={post.content} title={post.title} />
        </header>

        {/* Article Content */}
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, "<br>") }} />
        </div>
      </article>
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}
