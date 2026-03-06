"use client";

import {
  AvatarGroup,
  Carousel,
  Column,
  Flex,
  Heading,
  SmartLink,
  Text,
  Button,
} from "@once-ui-system/core";
import { useRouter } from "next/navigation";
interface ProjectCardProps {
  href: string;
  priority?: boolean;
  images: string[];
  title: string;
  content?: string;
  description: string;
  avatars: { src: string }[];
  link: string;
  tags?: string[];
  aspectRatio?: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({
  href,
  images = [],
  title,
  content,
  description,
  avatars = [],
  link,
  tags = [],
  aspectRatio = "21 / 9",
}) => {
  const router = useRouter();

  return (
    <div
      onClick={() => router.push(href)}
      style={{ textDecoration: 'none', display: 'block', cursor: 'pointer' }}
    >
      <Column 
        fillWidth 
        gap="m" 
        padding="24" 
        radius="l"
        className="project-card-list"
        style={{
          background: 'rgba(255, 255, 255, 0.02)',
          border: '1px solid var(--neutral-alpha-weak)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        <Column gap="16">
          <Flex vertical="start" horizontal="between" fillWidth gap="16">
              <Heading as="h2" variant="heading-strong-xl" style={{ color: 'var(--text-default-strong)', flex: 1 }}>
                  {title}
              </Heading>
              {avatars?.length > 0 && (
                  <Flex style={{ flexShrink: 0, paddingTop: '4px' }}>
                      <AvatarGroup avatars={avatars} size="m" reverse />
                  </Flex>
              )}
          </Flex>
        </Column>

        <Carousel
          sizes="(max-width: 960px) 100vw, 960px"
          items={images.map((image) => ({
            slide: image,
            alt: title,
          }))}
          aspectRatio={aspectRatio}
          radius="m"
        />

        <Column gap="24" paddingX="s" paddingTop="12">
          {description?.trim() && (
              <Text variant="body-default-m" onBackground="neutral-weak" style={{ lineHeight: '1.6' }}>
              {description}
              </Text>
          )}
          <Flex gap="32" wrap vertical="center" horizontal="between">
              {tags.length > 0 && (
                <div style={{ display: 'flex', gap: '12', flexWrap: 'wrap' }}>
                    {tags.map((tag) => (
                        <span 
                            key={tag} 
                            className="pill-tag"
                            style={{ 
                                padding: '4px 12px', 
                                borderRadius: '999px', 
                                fontSize: '0.75rem',
                                display: 'inline-flex',
                                alignItems: 'center'
                            }}
                        >
                            {tag}
                        </span>
                    ))}
                </div>
              )}

              <Flex gap="24" vertical="center" wrap>
                {link && (
                    <a 
                    href={link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    style={{ textDecoration: 'none' }}
                    >
                    <Button
                        variant="tertiary"
                        size="s"
                        suffixIcon="arrowUpRightFromSquare"
                    >
                        View Live
                    </Button>
                    </a>
                )}
                <Button
                    variant="secondary"
                    size="s"
                    suffixIcon="arrowRight"
                    weight="strong"
                    className="read-case-study-btn"
                >
                    Read Case Study
                </Button>
              </Flex>
          </Flex>
        </Column>
      </Column>
    </div>
  );
};
