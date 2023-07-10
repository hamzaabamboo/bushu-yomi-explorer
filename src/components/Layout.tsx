'use client'

import { Container, Stack } from "@chakra-ui/react";
import { ReactNode } from "react";

export const Layout = ({children}: {children:ReactNode}) => {
    return <Container maxWidth={['full', null, '80vw']} mx="auto">
      <Stack>
        {children}
      </Stack>
  </Container>
}