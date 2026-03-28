import { Paper, Stack, Title } from '@mantine/core'
import ReactMarkdown from 'react-markdown'

type Props = {
    title: string
    markdown?: string
}

export const StepLessonContent = ({ title, markdown }: Props) => (
    <Paper
        radius="xl"
        p={{ base: 'md', sm: 'xl' }}
        style={{
            border: '2px solid var(--mantine-color-kidBlue-3)',
            background: 'linear-gradient(180deg, white 0%, hsl(197 90% 98%) 100%)',
        }}
    >
        <Stack gap="md">
            <Title order={3}>{title}</Title>
            <div
                style={{
                    fontSize: '1.05rem',
                    lineHeight: 1.65,
                }}
            >
                <ReactMarkdown
                    components={{
                        h2: ({ children }) => (
                            <Title order={4} mt="md" mb="xs">
                                {children}
                            </Title>
                        ),
                        p: ({ children }) => <p style={{ margin: '0.5rem 0' }}>{children}</p>,
                        code: ({ children }) => (
                            <code
                                style={{
                                    padding: '2px 8px',
                                    border: '1px solid var(--mantine-color-gray-3)',
                                    borderRadius: 8,
                                    fontWeight: 600,
                                }}
                            >
                                {children}
                            </code>
                        ),
                        pre: ({ children }) => (
                            <pre
                                style={{
                                    background: 'hsl(222 47% 11%)',
                                    color: 'hsl(210 40% 98%)',
                                    padding: '1rem',
                                    borderRadius: 12,
                                    overflow: 'auto',
                                    fontSize: '0.9rem',
                                }}
                            >
                                {children}
                            </pre>
                        ),
                        blockquote: ({ children }) => (
                            <blockquote
                                style={{
                                    borderLeft: '4px solid var(--mantine-color-violet-5)',
                                    margin: '0.75rem 0',
                                    paddingLeft: '1rem',
                                    color: 'var(--mantine-color-dimmed)',
                                }}
                            >
                                {children}
                            </blockquote>
                        ),
                    }}
                >
                    {markdown ?? ''}
                </ReactMarkdown>
            </div>
        </Stack>
    </Paper>
)
