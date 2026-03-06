import React from "react";
import {
  Column,
  RevealFx,
  Heading,
  Text,
  Button,
  Flex,
  Avatar,
} from "@once-ui-system/core";
import { home, about, person } from "@/resources";

export function Hero() {
  return (
    <Column
        fillWidth
        gap="l"
        padding="m"
        style={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <RevealFx
          translateY="4"
          fillWidth
          horizontal="start"
          paddingBottom="16"
        >
          <Flex gap="32" vertical="center" s={{ direction: "column", align: "center", textAlign: "center" }}>
            <Avatar
              src={person.avatar}
              size="xl"
              radius="full"
              style={{ flexShrink: 0 }}
            />

            <Column gap="16" style={{ flex: 1 }}>
              <Heading
                wrap="balance"
                variant="display-strong-l"
                style={{ color: "var(--text-default-strong)", margin: 0 }}
              >
                {home.headline}
              </Heading>

              <Text
                wrap="balance"
                variant="heading-default-xl"
                onBackground="neutral-weak"
                style={{ margin: 0 }}
              >
                {home.subline}
              </Text>
            </Column>
          </Flex>
        </RevealFx>

        <RevealFx
          paddingTop="12"
          delay={0.4}
          horizontal="start"
        >
          <Button
            id="about"
            data-border="rounded"
            href={about.path}
            variant="secondary"
            size="m"
            arrowIcon
          >
            <Flex gap="8" vertical="center">
              {about.avatar.display && (
                <Avatar src={person.avatar} size="m" radius="full" />
              )}
              {about.title}
            </Flex>
          </Button>
        </RevealFx>
      </Column>
  );
}
