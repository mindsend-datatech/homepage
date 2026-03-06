"use client";

import { Card, Column, Media, Row, Avatar, Text, Heading } from "@once-ui-system/core";
import { formatDate } from "@/utils/formatDate";
import { person } from "@/resources";

interface PostProps {
  post: any;
  thumbnail: boolean;
}

export default function Post({ post, thumbnail }: PostProps) {
  const imageSrc = post.metadata.image || (post.metadata.images && post.metadata.images.length > 0 ? post.metadata.images[0] : null);

  return (
    <Card
      fillWidth
      key={post.slug}
      href={`/blog/${post.slug}`}
      transition="micro-medium"
      border="transparent"
      background="transparent"
      padding="0"
      radius="l"
      style={{
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        background: 'rgba(255, 255, 255, 0.02)',
        border: '1px solid var(--neutral-alpha-weak)',
        transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-8px)';
        e.currentTarget.style.borderColor = 'var(--brand-alpha-medium)';
        e.currentTarget.style.boxShadow = '0 20px 40px rgba(0,0,0,0.4), 0 0 20px var(--brand-alpha-weak)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.borderColor = 'var(--neutral-alpha-weak)';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {thumbnail && (
        <div style={{ 
            position: 'relative', 
            width: '100%', 
            overflow: 'hidden', 
            background: 'var(--neutral-alpha-weak)',
        }}>
            <div style={{
                width: '100%',
                height: '180px',
                position: 'relative'
            }}>
                {imageSrc ? (
                <Media
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
                    radius="none"
                    src={imageSrc}
                    alt={"Thumbnail of " + post.metadata.title}
                    fill
                    style={{ 
                        objectFit: 'cover',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%'
                    }}
                />
                ) : (
                <Column fill vertical="center" horizontal="center" style={{ position: 'absolute', top: 0, left: 0, background: 'linear-gradient(135deg, var(--neutral-alpha-weak) 0%, var(--brand-alpha-weak) 100%)' }}>
                    <Text variant="label-default-l" onBackground="brand-weak">{post.metadata.tags?.[0] || post.metadata.tag || 'Blog'}</Text>
                </Column>
                )}
            </div>
        </div>
      )}
      
      <Column padding="16" gap="12" fillWidth>
        <Row vertical="center" horizontal="between" gap="12">
          <Row vertical="center" gap="8">
            <Avatar src={person.avatar} size="s" />
            <Text style={{ fontSize: '0.75rem' }} onBackground="neutral-weak">{person.name}</Text>
          </Row>
          <Text style={{ fontSize: '0.7rem' }} onBackground="neutral-weak">
            {formatDate(post.metadata.publishedAt, false)}
          </Text>
        </Row>
        
        <Heading as="h3" style={{ 
            color: 'var(--text-default-strong)',
            fontSize: '1.1rem',
            lineHeight: '1.4',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            minHeight: '2.8em'
        }}>
          {post.metadata.title}
        </Heading>

        {post.metadata.summary && (
          <Text 
            variant="body-default-s" 
            onBackground="neutral-weak"
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 1,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: '1.5'
            }}
          >
            {post.metadata.summary}
          </Text>
        )}
        <div style={{ display: 'flex', gap: '12', flexWrap: 'wrap', marginTop: '4' }}>
          {(post.metadata.tags || []).slice(0, 2).map((tag: string) => (
            <span 
              key={tag} 
              className="pill-tag"
              style={{ 
                padding: '2px 12px', 
                borderRadius: '999px', 
                background: 'rgba(57, 255, 100, 0.05)',
                color: '#39ff64',
                border: '1px solid rgba(57, 255, 100, 0.2)',
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
    </Card>
  );
}
