import {
  Avatar,
  Button,
  Column,
  Heading,
  Icon,
  IconButton,
  Media,
  Tag,
  Text,
  Meta,
  Schema,
  Row,
  RevealFx,
  Flex,
  Carousel
} from "@once-ui-system/core";
import { baseURL, about, person, social } from "@/resources";
import TableOfContents from "@/components/about/TableOfContents";
import styles from "@/components/about/about.module.scss";
import React from "react";

export async function generateMetadata() {
  return Meta.generate({
    title: about.title,
    description: about.description,
    baseURL: baseURL,
    image: `/api/og/generate?title=${encodeURIComponent(about.title)}`,
    path: about.path,
  });
}

export default function About() {
  const structure = [
    {
      title: about.intro.title,
      display: about.intro.display,
      items: [],
    },
    {
      title: about.work.title,
      display: about.work.display,
      items: about.work.experiences.map((experience) => experience.company),
    },
    {
      title: about.studies.title,
      display: about.studies.display,
      items: about.studies.institutions.map((institution) => institution.name),
    },
    {
      title: about.technical.title,
      display: about.technical.display,
      items: about.technical.skills.map((skill) => skill.title),
    },
  ];
  return (
    <Column maxWidth="m">
      <Schema
        as="webPage"
        baseURL={baseURL}
        title={about.title}
        description={about.description}
        path={about.path}
        image={`/api/og/generate?title=${encodeURIComponent(about.title)}`}
        author={{
          name: person.name,
          url: `${baseURL}${about.path}`,
          image: `${baseURL}${person.avatar}`,
        }}
      />
      {about.tableOfContent.display && (
        <Column
          left="0"
          style={{ top: "50%", transform: "translateY(-50%)" }}
          position="fixed"
          paddingLeft="24"
          gap="32"
          s={{ hide: true }}
        >
          <TableOfContents structure={structure} about={about} />
        </Column>
      )}
      <RevealFx translateY="12" speed="slow" fillWidth>
        <Row fillWidth s={{ direction: "column" }} horizontal="center">
            {about.avatar.display && (
            <Column
                className={styles.avatar}
                top="64"
                fitHeight
                position="sticky"
                s={{ position: "relative", style: { top: "auto" } }}
                xs={{ style: { top: "auto" } }}
                minWidth="160"
                paddingX="l"
                paddingBottom="xl"
                gap="m"
                flex={3}
                horizontal="center"
            >
                <Avatar src={person.avatar} size="xl" />
                {person.languages && person.languages.length > 0 && (
                <Row wrap gap="8">
                    {person.languages.map((language, index) => (
                    <Tag key={index} size="l">
                        {language}
                    </Tag>
                    ))}
                </Row>
                )}
            </Column>
            )}
            <Column className={styles.blockAlign} flex={9} maxWidth={64}>
            <Column
                id={about.intro.title}
                fillWidth
                minHeight="160"
                vertical="center"
                marginBottom="32"
            >
                {about.calendar.display && (
                <Row
                    fitWidth
                    border="brand-alpha-medium"
                    background="brand-alpha-weak"
                    radius="full"
                    padding="4"
                    gap="8"
                    marginBottom="m"
                    vertical="center"
                    className={styles.blockAlign}
                    style={{
                    backdropFilter: "blur(var(--static-space-1))",
                    }}
                >
                    <Icon paddingLeft="12" name="calendar" onBackground="brand-weak" />
                    <Row paddingX="8">Schedule a call</Row>
                    <IconButton
                    href={about.calendar.link}
                    data-border="rounded"
                    variant="secondary"
                    icon="chevronRight"
                    />
                </Row>
                )}
                <Heading className={styles.textAlign} variant="display-strong-xl">
                {person.name}
                </Heading>
                <Text
                className={styles.textAlign}
                variant="display-default-xs"
                onBackground="neutral-weak"
                >
                {person.role}
                </Text>
                {social.length > 0 && (
                <Row
                    className={styles.blockAlign}
                    paddingTop="20"
                    paddingBottom="8"
                    gap="8"
                    wrap
                    horizontal="center"
                    fitWidth
                    data-border="rounded"
                >
                    {social
                    .filter((item) => item.essential)
                    .map(
                        (item) =>
                        item.link && (
                            <React.Fragment key={item.name}>
                            <Row s={{ hide: true }}>
                                <Button
                                key={item.name}
                                href={item.link}
                                prefixIcon={item.icon}
                                label={item.name}
                                size="s"
                                weight="default"
                                variant="secondary"
                                />
                            </Row>
                            <Row hide s={{ hide: false }}>
                                <IconButton
                                size="l"
                                key={`${item.name}-icon`}
                                href={item.link}
                                icon={item.icon}
                                variant="secondary"
                                />
                            </Row>
                            </React.Fragment>
                        ),
                    )}
                </Row>
                )}
            </Column>

            {about.intro.display && (
                <Column textVariant="body-default-l" fillWidth gap="m" marginBottom="xl">
                {about.intro.description}
                </Column>
            )}

            {about.work.display && (
                <>
                <Heading as="h2" id={about.work.title} variant="display-strong-s" marginBottom="m">
                    {about.work.title}
                </Heading>
                <Column fillWidth gap="l" marginBottom="40">
                    {about.work.experiences.map((experience, index) => (
                    <Column key={`${experience.company}-${experience.role}-${index}`} fillWidth gap="16" marginBottom="32">
                        <Row fillWidth horizontal="between" vertical="center" marginBottom="4">
                        <Row vertical="center" gap="8">
                            <Text id={experience.company} variant="heading-strong-l">
                                {experience.company}
                            </Text>
                            {experience.linkedin && (
                                <a
                                    href={experience.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                        display: "inline-flex",
                                        alignItems: "center",
                                        textDecoration: "none",
                                        color: 'inherit'
                                    }}
                                >
                                    <Icon name="linkedin" size="s" onBackground="neutral-weak" />
                                </a>
                            )}
                        </Row>
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                            {experience.timeframe}
                        </Text>
                    </Row>
                        <Text variant="body-default-s" onBackground="brand-weak">
                            {experience.role}
                        </Text>
                        
                        <Row fillWidth gap="l" vertical="start" s={{ direction: "column", horizontal: "center" }}>
                            {experience.images && experience.images.length > 0 && (
                                <Avatar
                                    src={experience.images[0].src}
                                    size="xl"
                                    style={{
                                        width: 200,
                                        height: 200,
                                        flexShrink: 0,
                                        borderRadius: 'var(--radius-l)'
                                    }}
                                />
                            )}
                            <Column as="ul" gap="16" flex={1}>
                                {experience.achievements.map((achievement: React.ReactNode, index: number) => (
                                    <Text
                                        as="li"
                                        variant="body-default-m"
                                        key={`${experience.company}-${index}`}
                                    >
                                        {achievement}
                                    </Text>
                                ))}
                            </Column>
                        </Row>
                    </Column>
                    ))}
                </Column>
                </>
            )}

            {about.studies.display && (
                <>
                <Heading as="h2" id={about.studies.title} variant="display-strong-s" marginBottom="m">
                    {about.studies.title}
                </Heading>
                <Column fillWidth gap="l" marginBottom="40">
                    {about.studies.institutions.map((institution, index) => (
                    <Column key={`${institution.name}-${index}`} fillWidth gap="4">
                        <Text id={institution.name} variant="heading-strong-l">
                        {institution.name}
                        </Text>
                        <Text variant="heading-default-xs" onBackground="neutral-weak">
                        {institution.description}
                        </Text>
                    </Column>
                    ))}
                </Column>
                </>
            )}

            {about.technical.display && (
                <>
                <Heading
                    as="h2"
                    id={about.technical.title}
                    variant="display-strong-s"
                    marginBottom="40"
                >
                    {about.technical.title}
                </Heading>
                <Carousel
                    items={about.technical.skills.map((skill, index) => ({
                        slide: (
                            <Column key={`${skill.title}-${index}`} fillWidth gap="12" padding="l" radius="l" background="neutral-alpha-weak" border="neutral-alpha-weak" horizontal="center" style={{ textAlign: 'center' }}>
                                {skill.images && skill.images.length > 0 && (
                                    <Media
                                        src={skill.images[0].src}
                                        alt={skill.images[0].alt}
                                        width={64}
                                        height={64}
                                        radius="m"
                                    />
                                )}
                                <Text variant="heading-strong-l">
                                    {skill.title}
                                </Text>
                                <Text variant="body-default-m" onBackground="neutral-weak" style={{ maxWidth: '400px' }}>
                                    {skill.description}
                                </Text>
                            </Column>
                        )
                    }))}
                    aspectRatio="16 / 9"
                    indicator="line"
                />
                </>
            )}
            </Column>
        </Row>
      </RevealFx>
    </Column>
  );
}
