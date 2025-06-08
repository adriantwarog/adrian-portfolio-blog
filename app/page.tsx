import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"

const blogPosts = [
  {
    id: "react-server-components",
    title: "Understanding React Server Components",
    description:
      "A deep dive into React Server Components and how they're changing the way we build React applications.",
    image: "/placeholder.svg?height=200&width=400",
    audio: "/placeholder.mp3",
    date: "2024-01-15",
    readTime: "8 min read",
    tags: ["React", "Next.js", "Server Components"],
  },
  {
    id: "vps-hosting-guide",
    title: "Complete Guide to VPS Hosting",
    description:
      "Everything you need to know about choosing, setting up, and managing your own VPS for web development.",
    image: "/placeholder.svg?height=200&width=400",
    audio: "/placeholder.mp3",
    date: "2024-01-10",
    readTime: "12 min read",
    tags: ["DevOps", "Hosting", "Linux"],
  },
  {
    id: "typescript-best-practices",
    title: "TypeScript Best Practices for 2024",
    description: "Modern TypeScript patterns and practices that will make your code more maintainable and type-safe.",
    image: "/placeholder.svg?height=200&width=400",
    audio: "/placeholder.mp3",
    date: "2024-01-05",
    readTime: "10 min read",
    tags: ["TypeScript", "JavaScript", "Best Practices"],
  },
  {
    id: "docker-development",
    title: "Docker for Local Development",
    description: "How to use Docker to create consistent development environments and streamline your workflow.",
    image: "/placeholder.svg?height=200&width=400",
    audio: "/placeholder.mp3",
    date: "2023-12-28",
    readTime: "15 min read",
    tags: ["Docker", "DevOps", "Development"],
  },
  {
    id: "api-design-principles",
    title: "RESTful API Design Principles",
    description: "Essential principles for designing clean, maintainable, and scalable REST APIs.",
    image: "/placeholder.svg?height=200&width=400",
    audio: "/placeholder.mp3",
    date: "2023-12-20",
    readTime: "9 min read",
    tags: ["API", "Backend", "Design"],
  },
  {
    id: "performance-optimization",
    title: "Web Performance Optimization Techniques",
    description: "Practical techniques to improve your website's performance and user experience.",
    image: "/placeholder.svg?height=200&width=400",
    audio: "/placeholder.mp3",
    date: "2023-12-15",
    readTime: "11 min read",
    tags: ["Performance", "Web Development", "Optimization"],
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold">Developer Blog</h1>
              <p className="text-muted-foreground mt-1">Thoughts on web development, DevOps, and technology</p>
            </div>
            <nav className="hidden md:flex space-x-6">
              <Link href="/" className="text-foreground hover:text-primary">
                Home
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-primary">
                About
              </Link>
              <Link href="/contact" className="text-muted-foreground hover:text-primary">
                Contact
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-12 bg-muted/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to My Developer Blog</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Sharing insights, tutorials, and experiences from the world of web development, DevOps, and modern
            technology stack.
          </p>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h3 className="text-2xl font-bold mb-8">Latest Posts</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {blogPosts.map((post) => (
              <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span>{new Date(post.date).toLocaleDateString()}</span>
                    <Clock className="h-4 w-4 ml-2" />
                    <span>{post.readTime}</span>
                  </div>
                  <CardTitle className="line-clamp-2">
                    <Link href={`/blog/${post.id}`} className="hover:text-primary">
                      {post.title}
                    </Link>
                  </CardTitle>
                  <CardDescription className="line-clamp-3">{post.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-8 mt-12">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>&copy; 2024 Developer Blog. Built with Next.js and passion for sharing knowledge.</p>
        </div>
      </footer>
    </div>
  )
}
