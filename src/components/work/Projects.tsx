"use client";

import React, { useState } from "react";
import { Column, Media, SmartLink, Button, Text, Grid, Heading, RevealFx } from "@once-ui-system/core";
import { ProjectCard } from "@/components";

interface ProjectsProps {
  posts: any[];
  range?: [number, number?];
  exclude?: string[];
  display?: "list" | "grid" | "row";
}

export function Projects({ posts, range, exclude, display = "list" }: ProjectsProps) {
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  let allProjects = [...posts];

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
                    src={post.metadata.images?.[0] || post.metadata.image || ""}
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

  if (display === "grid") {
    return (
      <Grid columns={3} m={{ columns: 2 }} s={{ columns: 1 }} fillWidth gap="24" paddingX="l" marginBottom="40">
        {displayedProjects.map((post, index) => {
          const imageSrc = post.metadata.images?.[0] || post.metadata.image;

          return (
          <RevealFx key={post.slug} translateY="12" delay={index * 0.1} speed="medium" fillWidth>
            <SmartLink
                href={`/work/${post.slug}`}
                style={{ 
                textDecoration: 'none'
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
            >
                <Column 
                fillWidth 
                gap="0" 
                radius="l"
                style={{
                    background: 'rgba(255, 255, 255, 0.02)',
                    border: '1px solid var(--neutral-alpha-weak)',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
                    transform: hoveredIndex === index ? 'translateY(-8px)' : 'translateY(0)',
                    borderColor: hoveredIndex === index ? 'var(--brand-alpha-medium)' : 'var(--neutral-alpha-weak)',
                    boxShadow: hoveredIndex === index ? '0 20px 40px rgba(0,0,0,0.4), 0 0 20px var(--brand-alpha-weak)' : 'none'
                }}
                >
                <div style={{ 
                    position: 'relative', 
                    width: '100%', 
                    overflow: 'hidden', 
                    background: 'var(--neutral-alpha-weak)',
                }}>
                    {imageSrc ? (
                    <Media
                        priority
                        src={imageSrc}
                        alt={post.metadata.title}
                        radius="none"
                        aspectRatio="21 / 9"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        style={{ 
                        objectFit: "cover",
                        transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
                        transform: hoveredIndex === index ? 'scale(1.05)' : 'scale(1)',
                        width: '100%'
                        }}
                    />
                    ) : (
                    <div style={{ width: '100%', height: '180px', position: 'relative' }}>
                        <Column fill vertical="center" horizontal="center" gap="16" style={{ position: 'absolute', top: 0, left: 0, background: 'linear-gradient(135deg, var(--neutral-alpha-weak) 0%, var(--brand-alpha-weak) 100%)' }}>
                            <Text variant="label-default-l" onBackground="brand-weak">{post.metadata.tags?.[0] || 'Project'}</Text>
                        </Column>
                    </div>
                    )}
                    <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'var(--brand-alpha-weak)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    opacity: hoveredIndex === index ? 1 : 0,
                    transition: 'opacity 0.4s ease',
                    zIndex: 2,
                    backdropFilter: 'blur(4px)'
                    }}>
                    <Button
                        variant="primary"
                        size="s"
                        suffixIcon="arrowRight"
                        style={{ pointerEvents: 'none' }}
                    >
                        View Project
                    </Button>
                    </div>
                </div>
                <Column padding="16" gap="8">
                    <Heading as="h3" style={{ 
                        color: 'var(--text-default-strong)',
                        fontSize: '1.25rem',
                        lineHeight: '1.4',
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        minHeight: '4.2em'
                    }}>
                    {post.metadata.title}
                    </Heading>
                    <Text 
                    variant="body-default-s" 
                    onBackground="neutral-weak"
                    style={{
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        lineHeight: '1.5'
                    }}
                    >
                    {post.metadata.summary}
                    </Text>
                    <div style={{ display: 'flex', gap: '12', flexWrap: 'wrap', marginTop: '4' }}>
                    {post.metadata.tags?.slice(0, 3).map((tag: string) => (
                        <span 
                        key={tag} 
                        className="pill-tag"
                        style={{ 
                            padding: '2px 12px', 
                            borderRadius: '999px', 
                            fontSize: '0.7rem',
                            lineHeight: '1.4',
                            display: 'inline-flex',
                            alignItems: 'center',
                            whiteSpace: 'nowrap'
                        }}
                        >
                        {tag}
                        </span>
                    ))}
                    </div>
                </Column>
                </Column>
            </SmartLink>
          </RevealFx>
          );
        })}
      </Grid>
    );
  }

  if (display === "list") {
    return (
      <Column fillWidth gap="xl" marginBottom="40" paddingX="l">
        {displayedProjects.map((post, index) => (
          <ProjectCard
            priority={index < 2}
            key={post.slug}
            href={`/work/${post.slug}`}
            images={post.metadata.images || (post.metadata.image ? [post.metadata.image] : [])}
            title={post.metadata.title}
            description={post.metadata.summary}
            content={post.content}
            avatars={post.metadata.team?.map((member: any) => ({ src: member.avatar })) || []}
            link={post.metadata.link || ""}
            tags={post.metadata.tags}
            aspectRatio="21 / 9"
          />
        ))}
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
          images={post.metadata.images || (post.metadata.image ? [post.metadata.image] : [])}
          title={post.metadata.title}
          description={post.metadata.summary}
          content={post.content}
          avatars={post.metadata.team?.map((member: any) => ({ src: member.avatar })) || []}
          link={post.metadata.link || ""}
          tags={post.metadata.tags}
          aspectRatio="21 / 9"
        />
      ))}
    </Column>
  );
}
