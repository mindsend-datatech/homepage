"use client";

import { Flex, Heading, Text, Grid, Icon } from "@once-ui-system/core";

const servicesList = [
    {
        title: "Blockchain Development",
        description: "End-to-end dApp conceptualization, smart contract engineering, and secure on-chain deployment.",
        icon: "code"
    },
    {
        title: "Smart Contracts",
        description: "Robust, audited contracts in Pact and Solidity, ensuring safety and efficiency for DeFi and NFT protocols.",
        icon: "file"
    },
    {
        title: "Web3 Infrastructure",
        description: "Scalable node management, indexing solutions, and high-performance backend architecture.",
        icon: "server"
    }
];

export const Services = () => {
    return (
        <Flex
            fillWidth paddingTop="104" paddingX="l"
            direction="column" horizontal="center" gap="l">

            <Heading as="h2" variant="display-default-s" marginBottom="m">
                Our Expertise
            </Heading>

            <Grid
                columns={3}
                m={{ columns: 1 }}
                s={{ columns: 1 }}
                fillWidth
                gap="24">
                {servicesList.map((service, index) => (
                    <Flex
                        key={index}
                        fillWidth
                        padding="l"
                        border="neutral-medium"
                        radius="l"
                        direction="column"
                        gap="s"
                        background="surface">
                        <Flex
                            width="48" height="48"
                            horizontal="center" vertical="center"
                            radius="m"
                            background="neutral-weak">
                            {/* Placeholder for icon, assuming 'Icon' component handles string names or we need to map them */}
                            <Icon name={service.icon} size="m" />
                        </Flex>
                        <Heading as="h3" variant="display-default-xs">
                            {service.title}
                        </Heading>
                        <Text variant="body-default-s" onBackground="neutral-weak">
                            {service.description}
                        </Text>
                    </Flex>
                ))}
            </Grid>
        </Flex>
    );
};
