export const BLUR_FADE_DELAY = 0.15

export const siteConfig = {
  name: "Starbot",
  description: "Automate your workflow with AI",
  url: process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
  keywords: ["SaaS", "Template", "Next.js", "React", "Tailwind CSS"],
  links: {
    email: "support@newhomestar.com",
    twitter: "https://twitter.com/magicuidesign",
    discord: "https://discord.gg/87p2vpsat5",
    github: "https://github.com/magicuidesign/magicui",
    instagram: "https://instagram.com/magicuidesign/"
  },
  header: [
    {
      trigger: "Features",
      content: {
        main: {
          icon: null, // Will be populated with StarfleetLogo component
          title: "Builder Competitive Edge",
          description: "Streamline your workflow with intelligent automation.",
          href: "#"
        },
        items: [
          {
            href: "#",
            title: "Market Intelligence",
            description:
              "Track competitor pricing, incentives, and design trends in real time. This aligns with Starbot's AI-driven automation but emphasizes how builders can leverage automated data collection for strategic decision-making."
          },
          {
            href: "#",
            title: "AI-Powered Automation",
            description:
              "Automate data collection, analysis, and reporting to stay ahead effortlessly."
          },
          {
            href: "#",
            title: "Visual Data Analysis",
            description:
              "Use AI to classify and compare design trends across builder communities."
          }
        ]
      }
    },
    {
      trigger: "Solutions",
      content: {
        items: [
          {
            title: "Sales Professionals",
            href: "#",
            description:
              "Automated Lead Qualification: Streamline the lead management process with AI-driven lead scoring, ensuring sales agents focus their efforts on the most promising prospects."
          },
          {
            title: "Marketing",
            href: "#",
            description:
              "Targeted Marketing Campaigns: Leverage AI to segment audiences and create highly targeted marketing campaigns that resonate with different buyer personas, improving campaign ROI."
          },
          {
            title: "Finance",
            href: "#",
            description:
              "Implement AI for automating routine financial processes, such as invoice processing and expense tracking, reducing errors and freeing up time for strategic financial planning."
          },
          {
            title: "Operations",
            href: "#",
            description:
              "Use AI to monitor operational processes, identify bottlenecks, and suggest improvements for increased operational efficiency."
          },
          {
            title: "Backlog Management",
            href: "#",
            description:
              "Analyze customer feedback and social media mentions with AI to gauge customer sentiment, providing valuable insights into customer satisfaction and areas for improvement."
          },
          {
            title: "Executive Leadership",
            href: "#",
            description:
              "Provide AI-powered analytics and data visualization tools to support strategic decision-making, offering insights into market trends, operational efficiency, and financial performance."
          }
        ]
      }
    },
    {
      href: "/pricing",
      label: "Pricing"
    }
  ],
  pricing: [
    {
      name: "BASIC",
      href: "#",
      price: "$0",
      period: "month",
      yearlyPrice: "$0",
      features: [
        "1500 Tokens",
        "2GB Storage",
        "Basic Support",
        "Limited API Access",
        "Standard Analytics"
      ],
      description: "Perfect for individuals and small projects",
      buttonText: "Continue",
      isPopular: false
    },
    {
      name: "PRO",
      href: "#",
      price: "$49",
      period: "month",
      yearlyPrice: "$40",
      features: [
        "25k Tokens",
        "50GB Storage",
        "Priority Support",
        "Full API Access",
        "Advanced Analytics"
      ],
      description: "Ideal for growing businesses and teams",
      buttonText: "Subscribe",
      isPopular: true
    },
    {
      name: "ENTERPRISE",
      href: "#",
      price: "$150",
      period: "month",
      yearlyPrice: "$100",
      features: [
        "Unlimited tokens",
        "500GB Storage",
        "24/7 Premium Support",
        "Custom Integrations",
        "AI-Powered Insights"
      ],
      description: "For large-scale operations and high-volume users",
      buttonText: "Subscribe",
      isPopular: false
    }
  ],
  faqs: [
    {
      question: "What is Starbot.ai?",
      answer: (
        <span>
          Starbot.ai is a platform that helps you build and manage your AI-powered
          applications. It provides tools and services to streamline the
          development and deployment of AI solutions.
        </span>
      )
    },
    {
      question: "How can I get started with Starbot?",
      answer: (
        <span>
          You can get started with Starbot by signing up for an account on our
          website, creating a new project, and following our quick-start guide.
          We also offer tutorials and documentation to help you along the way.
        </span>
      )
    },
    {
      question: "What types of AI models does Starbot support?",
      answer: (
        <span>
          Starbot supports a wide range of AI models, including but not limited
          to natural language processing, computer vision, and predictive
          analytics. We continuously update our platform to support the latest
          AI technologies.
        </span>
      )
    },
    {
      question: "Is Starbot suitable for beginners in AI?",
      answer: (
        <span>
          Yes, Starbot is designed to be user-friendly for both beginners and
          experienced developers. We offer intuitive interfaces, pre-built
          templates, and extensive learning resources to help users of all skill
          levels create AI-powered applications.
        </span>
      )
    },
    {
      question: "What kind of support does Starbot provide?",
      answer: (
        <span>
          Starbot provides comprehensive support including documentation, video
          tutorials, a community forum, and dedicated customer support. We also
          offer premium support plans for enterprises with more complex needs.
        </span>
      )
    }
  ],
  footer: [
    {
      title: "Product",
      links: [
        { href: "#", text: "Features", icon: null },
        { href: "#", text: "Pricing", icon: null },
        { href: "#", text: "Documentation", icon: null },
        { href: "#", text: "API", icon: null }
      ]
    },
    {
      title: "Company",
      links: [
        { href: "#", text: "About Us", icon: null },
        { href: "#", text: "Careers", icon: null },
        { href: "#", text: "Blog", icon: null },
        { href: "#", text: "Press", icon: null },
        { href: "#", text: "Partners", icon: null }
      ]
    },
    {
      title: "Resources",
      links: [
        { href: "#", text: "Community", icon: null },
        { href: "#", text: "Contact", icon: null },
        { href: "#", text: "Support", icon: null },
        { href: "#", text: "Status", icon: null }
      ]
    },
    {
      title: "Social",
      links: [
        {
          href: "#",
          text: "Twitter",
          icon: null // Will be populated with icon component
        },
        {
          href: "#",
          text: "Instagram",
          icon: null
        },
        {
          href: "#",
          text: "Youtube",
          icon: null
        }
      ]
    }
  ]
}

export type SiteConfig = typeof siteConfig
