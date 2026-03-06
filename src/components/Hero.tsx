import React from "react";
import {
  Column,
  RevealFx,
  Heading,
  Text,
  Button,
} from "@once-ui-system/core";
import { home, about } from "@/resources";

export function Hero() {
  return (
    <section
      style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
        zIndex: 1,
        marginTop: '-80px',
        padding: 0,
        margin: '-80px 0 0 0'
      }}
    >
      <RevealFx
        translateY="4"
        fillWidth
        horizontal="center"
      >
        <Column gap="24" horizontal="center" style={{ textAlign: "center", width: '100%' }}>
          <Heading
            wrap="balance"
            variant="display-strong-xl"
            style={{ 
              color: "var(--neutral-on-background-strong)", 
              margin: 0,
              fontSize: "4rem",
              maxWidth: "100%",
              lineHeight: "1.2",
              textShadow: "0 0 40px var(--brand-alpha-medium)",
              whiteSpace: "normal",
              wordBreak: "normal"
            }}
          >
            {home.headline}
          </Heading>

          <Text
            wrap="balance"
            variant="heading-default-xl"
            onBackground="neutral-weak"
            style={{ 
              margin: 0,
              maxWidth: "800px"
            }}
          >
            {home.subline}
          </Text>
        </Column>
      </RevealFx>

      <RevealFx
        paddingTop="48"
        delay={0.4}
        horizontal="center"
      >
        <Button
          id="about"
          data-border="rounded"
          href={about.path}
          variant="secondary"
          size="l"
          suffixIcon="arrowRight"
          className="hero-cta-button"
          style={{
            border: '2px solid var(--hero-button-color, #39ff64)',
            color: 'var(--hero-button-color, #39ff64)',
            background: 'transparent',
            transition: 'all 0.3s ease'
          }}
        >
          About Us
        </Button>
      </RevealFx>
    </section>
  );
}
