"use client";

import { Flex, Heading, Grid, Text, Media } from "@once-ui-system/core";
import { about } from "@/resources";

export const TechStack = () => {
    return (
        <Flex fillWidth direction="column" horizontal="center" paddingY="l" gap="l">
            <Text variant="label-default-l" onBackground="neutral-weak" style={{ letterSpacing: "0.1em" }}>
                TRUSTED TECHNOLOGIES
            </Text>
            <Grid
                columns={6}
                s={{ columns: 3 }}
                gap="24"
                paddingX="l"
                fillWidth
                maxWidth="l">
                {about.technical.skills.map((skill, index) => (
                    <Flex
                        key={index}
                        direction="column"
                        horizontal="center"
                        gap="xs"
                        padding="s"
                        radius="m"
                        // background="surface"
                        // border="neutral-weak"
                        style={{ opacity: 0.8 }}
                    >
                        {/* Using img tag directly if standard icons, or specialized icon component if available */}
                        {/* Since content.js has 'img' paths, we can use SmartImage or img */}
                        <div style={{ filter: "grayscale(100%) brightness(1.2)", transition: "all 0.2s" }} className="hover:filter-none">
                            {skill.images?.[0] && (
                                <Media
                                    src={skill.images[0].src}
                                    alt={skill.images[0].alt || skill.title}
                                    height={2}
                                    width={2}
                                    sizes="40px"
                                    style={{ objectFit: "contain" }}
                                />
                            )}
                        </div>
                    </Flex>
                ))}
            </Grid>
        </Flex>
    );
};
