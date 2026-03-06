import React from "react";
import {
  Heading,
  Text,
  RevealFx,
  Column,
  Schema,
  Meta,
  Row,
  Flex,
  Button,
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes, work } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { Hero } from "@/components/Hero";
import { Mailchimp } from "@/components";
import { getPosts } from "@/utils/utils";

export async function generateMetadata() {
  return Meta.generate({
    title: home.title,
    description: home.description,
    baseURL: baseURL,
    path: home.path,
    image: home.image,
  });
}

export default function Home() {
  const allProjects = getPosts(["src", "app", "work", "projects"]);

  return (
    <Column maxWidth="l" horizontal="center">
      <Schema
        as="webPage"
        baseURL={baseURL}
        path={home.path}
        title={home.title}
        description={home.description}
        image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      
      <Hero />

      <Column fillWidth gap="32" paddingY="32" paddingX="l">
        <RevealFx translateY="16" speed="slow">
            <Column fillWidth gap="32">
                <Row fillWidth horizontal="between" vertical="end" paddingX="l">
                    <Heading as="h2" variant="display-strong-s">
                        Featured Projects
                    </Heading>
                    <Button
                        href={work.path}
                        variant="secondary"
                        size="s"
                        suffixIcon="arrowRight"
                    >
                        View all
                    </Button>
                </Row>
                <Projects posts={allProjects} range={[1, 6]} display="grid" />
            </Column>
        </RevealFx>

        {routes["/blog"] && (
            <RevealFx translateY="16" speed="slow" delay={0.2}>
                <Column fillWidth gap="40">
                    <Heading as="h2" variant="display-strong-s" paddingLeft="l">
                    Latest from the blog
                    </Heading>
                    <Flex fillWidth paddingX="20">
                    <Posts range={[1, 4]} columns="2" thumbnail={false} />
                    </Flex>
                </Column>
            </RevealFx>
        )}

        <RevealFx translateY="16" speed="slow" delay={0.4}>
            <Mailchimp />
        </RevealFx>
      </Column>
    </Column>
  );
}
