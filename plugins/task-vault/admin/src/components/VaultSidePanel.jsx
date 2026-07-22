import { Box, Button, Flex, Typography, Link } from '@strapi/design-system';
import {useState} from "react";

export default function VaultSidePanel() {
  const [timer, setTimer] = useState(0);

  return (
    <Box padding={4}>
      <Flex direction="column" gap={3}>
        <Typography variant="beta">Timer: {timer}</Typography>

        <Button onClick={() => setTimer((t) => t + 1)}>Increase</Button>

        <Button variant="secondary" onClick={() => setTimer((t) => t - 1)}>
          Decrease
        </Button>
      </Flex>
    </Box>
  );
}
