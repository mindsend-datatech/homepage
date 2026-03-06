import { About, Blog, Gallery, Home, Newsletter, Person, Social, Work } from "@/types";
import { Row, Text } from "@once-ui-system/core";

const person: Person = {
  firstName: "Mindsend",
  lastName: "Datatech",
  name: "Mindsend Datatech",
  role: "Building real solutions for the decentralized web",
  avatar: "/images/avatar.png",
  //email: "example@gmail.com",
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
      <>
        We are a Web3-focused development team that designs, builds, and
        maintains robust blockchain solutions. From infrastructure to
        user-facing applications, we’ve helped shape core components of the
        Kadena ecosystem—contributing to some of its most impactful and widely
        used tools. Our mission is simple: to deliver practical, secure, and
        scalable products that meet the needs of modern decentralized systems.
      </>
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
          description: <>Smart contract language for Kadena.</>,
          tags: [
            {
              name: "Pact",
              icon: "pact",
            },
          ],
        },
        {
          title: "Solidity",
          description: <>Smart contract language for Ethereum.</>,
          tags: [
            {
              name: "Solidity",
              icon: "solidity",
            },
          ],
        },
        {
            title: "TypeScript",
            description: <>Main programming language for frontend and backend.</>,
            tags: [
              {
                name: "TypeScript",
                icon: "typescript",
              },
            ],
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
