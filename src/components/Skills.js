import { Divider, Stack, Text, Container, Box, HStack, VStack, Heading, Image } from "@chakra-ui/react"
import { Fade } from "react-reveal"
import SkillsArray from "./SkillsArray"

export default function Skills({ color }) {
  const skills = SkillsArray()

  return (
    <Container maxW={"3xl"} id="skills">
      <Stack as={Box} textAlign={"center"} spacing={{ base: 8, md: 14 }} pb={{ base: 20, md: 36 }}>
        <Stack align="center" direction="row" p={4}>
          <HStack mx={4}>
            <Text color={`${color}.400`} fontWeight={800}>
              02
            </Text>
            <Text fontWeight={800}>Skills</Text>
          </HStack>
          <Divider orientation="horizontal" />
        </Stack>

        <VStack spacing={8}>
          {skills.map((skill, index) => (
            <Fade bottom key={index}>
              <Box width="100%" align="center">
                <Heading as="h3" size="md" mb={4} textAlign="center">
                  {skill.category}
                </Heading>
                <Image src={`https://skillicons.dev/icons?i=${skill.icons}`} alt={skill.category} borderRadius="md" />
              </Box>
            </Fade>
          ))}
        </VStack>
      </Stack>
    </Container>
  )
}

