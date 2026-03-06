"use client";

import React, { useState } from "react";
import { getPosts } from "@/utils/utils";
import { Column, Media, SmartLink, Button, Text } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  range?: [number, number?];
  exclude?: string[];
  display?: "list" | "grid" | "row";
}

export function Projects({ range, exclude, display = "list" }: ProjectsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  let allProjects = getPosts(["src", "app", "work", "projects"]);

  // Exclude by slug (exact match)
  if (exclude && exclude.length > 0) {
    allProjects = allProjects.filter((post) => !exclude.includes(post.slug));
  }

  const sortedProjects = allProjects.sort((a, b) => {
    return new Date(b.metadata.publishedAt).getTime() - new Date(a.metadata.publishedAt).getTime();
  });

  const displayedProjects = range
    ? sortedProjects.slice(range[0] - 1, range[1] ?? sortedProjects.length)
    : sortedProjects;

  if (display === "row") {
    const marqueeProjects = [...displayedProjects, ...displayedProjects];

    return (
      <Column 
        fillWidth 
        position="relative" 
        style={{ overflow: 'hidden' }}
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <style dangerouslySetInnerHTML={{ __html: `
          @keyframes marquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-container {
            display: flex;
            width: fit-content;
            animation: marquee 30s linear infinite;
            gap: 32px;
            padding: 24px 0;
          }
          .marquee-paused {
            animation-play-state: paused;
          }
        `}} />
        
        <div className={`marquee-container ${isPaused ? 'marquee-paused' : ''}`}>
          {marqueeProjects.map((post, index) => {
            const rotation = index % 2 === 0 ? "3deg" : "-3deg";
            return (
              <div key={`${post.slug}-${index}`} style={{ flexShrink: 0 }}>
                <SmartLink
                  href={`/work/${post.slug}`}
                  style={{
                    textDecoration: "none",
                    display: "block",
                    transform: `rotate(${rotation})`,
                    transition: "transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
                    width: "240px",
                    zIndex: 1,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "rotate(0deg) scale(1.1)";
                    e.currentTarget.style.zIndex = "10";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = `rotate(${rotation})`;
                    e.currentTarget.style.zIndex = "1";
                  }}
                >
                  <Media
                    src={post.metadata.images?.[0] || ""}
                    alt={post.metadata.title}
                    aspectRatio="1 / 1"
                    radius="m"
                    border="neutral-alpha-weak"
                    style={{ pointerEvents: 'none', boxShadow: "var(--shadow-l)" }}
                  />
                </SmartLink>
              </div>
            );
          })}
        </div>
      </Column>
    );
  }

  return (
    <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
      {displayedProjects.map((post, index) => (
        <ProjectCard
          priority={index < 2}
          key={post.slug}
          href={`/work/${post.slug}`}
          images={post.metadata.images}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member: any) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
        />
      ))}
    </Column>
  );
}
