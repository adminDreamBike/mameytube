'use client'

import React from 'react'
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  VStack,
  Text,
  Code,
  Link,
  UnorderedList,
  ListItem,
} from '@chakra-ui/react'

interface ErrorDisplayProps {
  error: Error | { message?: string; status?: number; response?: { status?: number; data?: { error?: { message?: string } } } } | null
  title?: string
}

const ErrorDisplay: React.FC<ErrorDisplayProps> = ({ error, title = 'Error Loading Videos' }) => {
  const err = error as { message?: string; status?: number; response?: { status?: number; data?: { error?: { message?: string } } } } | null;
  const is403Error = err?.status === 403 || err?.response?.status === 403
  const is400Error = err?.status === 400 || err?.response?.status === 400
  const errorMessage = err?.message || err?.response?.data?.error?.message || 'An unknown error occurred'

  return (
    <Box p={6} maxW="800px" mx="auto">
      <Alert
        status="error"
        variant="subtle"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        textAlign="center"
        minHeight="300px"
        borderRadius="lg"
      >
        <AlertIcon boxSize="40px" mr={0} />
        <AlertTitle mt={4} mb={1} fontSize="lg">
          {title}
        </AlertTitle>
        <AlertDescription maxWidth="sm">
          <VStack spacing={4} mt={4} align="stretch">
            <Text fontSize="sm" color="gray.600">
              {errorMessage}
            </Text>

            {is403Error && (
              <Box textAlign="left" fontSize="sm">
                <Text fontWeight="bold" mb={2}>
                  Common causes for 403 errors:
                </Text>
                <UnorderedList spacing={1} pl={4}>
                  <ListItem>
                    API key restrictions in Google Cloud Console
                  </ListItem>
                  <ListItem>
                    YouTube Data API v3 not enabled
                  </ListItem>
                  <ListItem>
                    Daily quota limit exceeded (10,000 units/day)
                  </ListItem>
                  <ListItem>
                    Domain not allowed in HTTP referrer restrictions
                  </ListItem>
                </UnorderedList>

                <Box mt={3} p={3} bg="gray.50" borderRadius="md">
                  <Text fontWeight="semibold" mb={1}>
                    To fix this:
                  </Text>
                  <Text fontSize="xs">
                    1. Go to{' '}
                    <Link
                      href="https://console.cloud.google.com/apis/credentials"
                      color="blue.500"
                      isExternal
                    >
                      Google Cloud Console
                    </Link>
                  </Text>
                  <Text fontSize="xs">
                    2. Check your API key restrictions
                  </Text>
                  <Text fontSize="xs">
                    3. Add your domain to allowed referrers
                  </Text>
                  <Text fontSize="xs">
                    4. Ensure YouTube Data API v3 is enabled
                  </Text>
                </Box>
              </Box>
            )}

            {is400Error && (
              <Box textAlign="left" fontSize="sm">
                <Text fontWeight="bold" mb={2}>
                  Bad Request (400):
                </Text>
                <Text fontSize="xs">
                  The request parameters are invalid. Check the console for more details.
                </Text>
              </Box>
            )}

            {!is403Error && !is400Error && (
              <Box textAlign="left" fontSize="sm">
                <Text fontSize="xs">
                  Please check the browser console for more details.
                </Text>
              </Box>
            )}

            {process.env.NODE_ENV === 'development' && (
              <Box mt={4}>
                <Text fontSize="xs" fontWeight="bold" mb={2}>
                  Error Details (Development Only):
                </Text>
                <Code p={2} borderRadius="md" fontSize="xs" display="block" whiteSpace="pre-wrap">
                  {JSON.stringify(
                    {
                      status: err?.status || err?.response?.status,
                      message: errorMessage,
                      apiKey: process.env.NEXT_PUBLIC_YOUTUBE_API_KEY ? 'Set' : 'Not Set',
                    },
                    null,
                    2
                  )}
                </Code>
              </Box>
            )}
          </VStack>
        </AlertDescription>
      </Alert>
    </Box>
  )
}

export default ErrorDisplay
