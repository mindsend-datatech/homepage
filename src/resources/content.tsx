import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Mindsend",
  lastName: "Datatech",
  name: "Mindsend Datatech",
  role: "Building real solutions for the decentralized web",
  avatar: "/images/avatar.png",
  email: "info@mindsend.xyz",
  location: "America/Sao_Paulo", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
  languages: ["English", "Portuguese"], // optional: Leave the array empty if you don't want to display languages
};

const newsletter: Newsletter = {
  display: false,
  title: <>Subscribe to {person.firstName}'s Newsletter</>,
  description: (
    <>
      I occasionally write about design, technology, and share thoughts on the
      intersection of creativity and engineering.
    </>
  ),
};

const social: Social = [
  // Links are automatically displayed.
  // Import new icons in /once-ui/icons.ts
  {
    name: "GitHub",
    icon: "github",
    link: "https://github.com/mindsend-datatech",
  },
];

const home: Home = {
  path: "/",
  image:
    "https://opengraph.b-cdn.net/production/images/c53b648f-c423-4882-b67f-b10117ea61e5.jpg?token=-m4wfD7XKjkhxfcKZRbRrPyQYbCEX3VdsTSShF51NbY&height=630&width=1200&expires=33295179384",
  label: "Home",
  title: `${person.name}`,
  description:
    `${person.name}`,
  headline: <>Powering the Web3 revolution with full-cycle development </>,
  featured: {
    display: false,
    title: (
      <>
        Recent project: <strong className="ml-4">Kadena Cabinet</strong>
      </>
    ),
    href: "/work/cabinet",
  },
  subline: (
    <>
      Transforming complex technologies into accessible, seamless solutions for
      the decentralized world{" "}
    </>
  ),
};

const about: About = {
  path: "/about",
  label: "About",
  title: `About – ${person.name}`,
  description: `Meet the ${person.name} crew`,
  tableOfContent: {
    display: true,
    subItems: false,
  },
  avatar: {
    display: true,
  },
  calendar: {
    display: true,
    link: "https://cal.com/mindsend",
  },
  intro: {
    display: true,
    title: "Introduction",
    description: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '32' }}>
        <Text variant="body-default-l" onBackground="neutral-strong" style={{ fontSize: '1.5rem', lineHeight: '1.6', margin: 0 }}>
          We are a Web3-focused development team that designs, builds, and
          maintains robust blockchain solutions. From infrastructure to
          user-facing applications, we’ve helped shape core components of the
          Kadena ecosystem—contributing to some of its most impactful and widely
          used tools.
        </Text>
        <Text variant="body-default-l" onBackground="neutral-strong" style={{ fontSize: '1.5rem', lineHeight: '1.6', margin: 0 }}>
          Our mission is simple: to deliver practical, secure, and scalable
          products that meet the needs of modern decentralized systems,
          transforming complex technologies into accessible, seamless solutions
          for the decentralized world.
        </Text>
      </div>
    ),
  },
  work: {
    display: true, // set to false to hide this section
    title: "Our team",
    experiences: [
      {
        company: "Ariel Serranoni",
        timeframe: " ",
        role: "Co-founder, Applied Mathematician, and Web3 Engineer",
        linkedin: "https://www.linkedin.com/in/ariel-serranoni-1b762815a/",
        github: "https://github.com/aserranoni/",
        achievements: [
          "Ariel is an applied mathematician with a Master’s in Computer Science and a strong track record designing, implementing, and managing Web3 systems. With deep technical foundations and a hands-on approach, he thrives in the fast-moving blockchain space—adapting quickly to new technologies and pushing the boundaries of what’s possible in decentralized architecture.",
        ],
        images: [
          {
            src: "/images/og/ariel.jpg",
            alt: "Ariel Serranoni",
            width: 1,
            height: 1
          }
        ]
      },
      {
        company: "Francisco Miranda",
        timeframe: " ",
        role: "Co-founder, Data Scientist, and Web3 Engineer",
        linkedin: "https://www.linkedin.com/in/chicodias/",
        github: "https://github.com/chicodias",
        achievements: [
          "Francisco brings consistency and curiosity to every project. With a background in Statistics and Data Science and an ongoing MBA in Software Engineering, he excels in infrastructure, networking, and backend development. A disciplined engineer and proactive team player, Francisco is the one who’s always up-to-date and always digging into the docs.",
        ],
        images: [
          {
            src: "/images/og/chico.jpg",
            alt: "Francisco Miranda",
            width: 1,
            height: 1
          }
        ]
      },
    ],
  },
  studies: {
    display: false, // set to false to hide this section
    title: "Studies",
    institutions: [
      {
        name: "University of Jakarta",
        description: <>Studied software engineering.</>,
      },
      {
        name: "Build the Future",
        description: <>Studied online marketing and personal branding.</>,
      },
    ],
  },
  technical: {
    display: true, // set to false to hide this section
    title: "Our Stack",
    skills: [
      {
        title: "Pact",
        description: "Smart contract language for Kadena.",
        images: [{ src: "/icons/pact.svg", alt: "Pact", width: 48, height: 48 }],
        link: "https://kadena.io/pact"
      },
      {
        title: "Solidity",
        description: "Smart contract language for Ethereum.",
        images: [{ src: "/icons/solidity.svg", alt: "Solidity", width: 48, height: 48 }],
        link: "https://soliditylang.org/"
      },
      {
        title: "TypeScript",
        description: "Main programming language for frontend and backend.",
        images: [{ src: "/icons/typescript.svg", alt: "TypeScript", width: 48, height: 48 }],
        link: "https://www.typescriptlang.org/"
      },
      {
        title: "Next.js",
        description: "Framework for building React applications.",
        images: [{ src: "/icons/nextdotjs.svg", alt: "Next.js", width: 48, height: 48 }],
        link: "https://nextjs.org/"
      },
      {
        title: "Vercel",
        description: "Platform for deployment and hosting.",
        images: [{ src: "/icons/vercel.svg", alt: "Vercel", width: 48, height: 48 }],
        link: "https://vercel.com/"
      },
      {
        title: "C#",
        description: "Backend programming language.",
        images: [{ src: "/icons/dotnet.svg", alt: "C#", width: 48, height: 48 }],
        link: "https://learn.microsoft.com/en-us/dotnet/csharp/"
      },
      {
        title: "PostgreSQL",
        description: "Relational database management system.",
        images: [{ src: "/icons/postgresql.svg", alt: "PostgreSQL", width: 48, height: 48 }],
        link: "https://www.postgresql.org/"
      },
      {
        title: "MongoDB",
        description: "NoSQL database management system.",
        images: [{ src: "/icons/mongodb.svg", alt: "MongoDB", width: 48, height: 48 }],
        link: "https://www.mongodb.com/"
      },
      {
        title: "Python",
        description: "General-purpose programming language.",
        images: [{ src: "/icons/python.svg", alt: "Python", width: 48, height: 48 }],
        link: "https://python.org"
      },
      {
        title: "R",
        description: "Language for statistical computing.",
        images: [{ src: "/icons/r.svg", alt: "R", width: 48, height: 48 }],
        link: "https://www.r-project.org/"
      },
      {
        title: "Linux",
        description: "Open-source operating system.",
        images: [{ src: "/icons/linux.svg", alt: "Linux", width: 48, height: 48 }],
        link: "https://www.kernel.org/"
      },
      {
        title: "Docker",
        description: "Platform for containerized applications.",
        images: [{ src: "/icons/docker.svg", alt: "Docker", width: 48, height: 48 }],
        link: "https://www.docker.com/"
      },
      {
        title: "TailwindCSS",
        description: "Utility-first CSS framework.",
        images: [{ src: "/icons/tailwindcss.svg", alt: "TailwindCSS", width: 48, height: 48 }],
        link: "https://tailwindcss.com"
      },
      {
        title: "Github",
        description: "Platform for code hosting and version control.",
        images: [{ src: "/icons/github.svg", alt: "Github", width: 48, height: 48 }],
        link: "https://github.com"
      },
      {
        title: "WalletConnect",
        description: "Protocol for connecting dApps to mobile wallets.",
        images: [{ src: "/icons/walletconnect.svg", alt: "WalletConnect", width: 48, height: 48 }],
        link: "https://walletconnect.network"
      },
      {
        title: "Git",
        description: "Distributed version control system.",
        images: [{ src: "/icons/git.svg", alt: "Git", width: 48, height: 48 }],
        link: "https://git-scm.com/"
      },
    ],
  },
};

const blog: Blog = {
  path: "/blog",
  label: "Blog",
  title: "Building on the edge of Web3",
  description: `Insights, deep dives, and lessons from ${person.name} on building decentralized systems, infrastructure, and real-world blockchain applications.`,
  // Create new blog posts by adding a new .mdx file to app/blog/posts
  // All posts will be listed on the /blog route
};

const work: Work = {
  path: "/work",
  label: "Work",
  title: `Projects – ${person.name}`,
  description: `Web3 projects by ${person.name}`,
  // Create new project pages by adding a new .mdx file to app/blog/posts
  // All projects will be listed on the /home and /work routes
};

const gallery: Gallery = {
  path: "/gallery",
  label: "Gallery",
  title: `Photo gallery – ${person.name}`,
  description: `A photo collection by ${person.name}`,
  // Images by https://lorant.one
  // These are placeholder images, replace with your own
  images: [
    {
      src: "/images/hero.png",
      alt: "image",
      orientation: "horizontal",
    },
  ],
};

export { person, social, newsletter, home, about, blog, work, gallery };
