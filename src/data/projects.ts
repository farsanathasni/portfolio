export type PortfolioProject = {
  slug: string
  title: string
  route?: string
  description: string
  technologies: string[]
  highlights: string[]
  userRoles?: string[]
  featured?: boolean
}

export const projects: PortfolioProject[] = [
  {
    slug: "petlora",
    title: "petLora",
    route: "/projects/petlora",
    description:
      "A full-stack pet service platform connecting pet owners with veterinarians, groomers, and boarding providers. Supports pet profiles, service discovery, bookings, provider communication, payments, and administration.",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Query",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "JWT",
      "Cloudinary",
      "Razorpay",
    ],
    highlights: [
      "Pet profiles",
      "Service discovery",
      "Booking management",
      "Provider communication",
      "Payments",
      "Admin panel",
    ],
    userRoles: ["Pet Owners", "Service Providers", "Admin"],
    featured: true,
  },
  {
    slug: "liyana-metals",
    title: "Liyana Metals / Home Needs",
    route: "/projects/liyana-metals",
    description:
      "A full-stack e-commerce application for browsing products, managing users and orders, and handling online payments through a dedicated admin system.",
    technologies: [
      "React",
      "Vite",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "Razorpay",
    ],
    highlights: [
      "Product management",
      "User management",
      "Order management",
      "Payment integration",
      "Dedicated admin system",
    ],
  },
  
]

export function getProjectRouteId(path: string) {
  if (path === "/projects/petlora") return "project-petlora"
  if (path === "/projects/liyana-metals") return "project-liyana-metals"
  return null
}
