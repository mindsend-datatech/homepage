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
} from "@once-ui-system/core";
import { home, about, person, baseURL, routes } from "@/resources";
import { Projects } from "@/components/work/Projects";
import { Posts } from "@/components/blog/Posts";
import { Hero } from "@/components/Hero";
import { Mailchimp } from "@/components";

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
  return (
    <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
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
      <Column fillWidth paddingY="24" gap="m">
        <Hero />
      </Column>
      
      <RevealFx translateY="16" delay={0.6} fillWidth>
        <Column fillWidth gap="24">
            <Heading as="h2" variant="display-strong-s" paddingLeft="l">
                Featured Projects
            </Heading>
            <Projects display="row" />
        </Column>
      </RevealFx>

      {routes["/blog"] && (
        <Flex fillWidth gap="24" mobileDirection="column" marginTop="48">
          <Flex flex={1} paddingLeft="l" paddingTop="24">
            <Heading as="h2" variant="display-strong-xs" wrap="balance">
              Latest from the blog
            </Heading>
          </Flex>
          <Flex flex={3} paddingX="20">
            <Posts range={[1, 2]} columns="2" />
          </Flex>
        </Flex>
      )}

      <Mailchimp />
    </Column>
  );
}
