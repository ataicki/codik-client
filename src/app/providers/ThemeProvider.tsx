import { MantineProvider, createTheme, MantineThemeOverride } from '@mantine/core'
import { PropsWithChildren } from 'react'

const getVar = (name: string, fallback: string) => {
    if (typeof window === 'undefined') return fallback
    return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback
}

const createColor = (value: string) =>
    Array.from({ length: 10 }, () => value) as [
        string, string, string, string, string,
        string, string, string, string, string
    ]

const buildTheme = (): MantineThemeOverride => ({
    fontFamily: 'Nunito, system-ui, sans-serif',

    primaryColor: 'violet',
    primaryShade: { light: 6, dark: 8 },

    defaultRadius: 'md',

    radius: {
        xs: '0.5rem',
        sm: '0.75rem',
        md: getVar('--radius', '1rem'),
        lg: '1.25rem',
        xl: '1.5rem',
    },

    colors: {
        violet: createColor(getVar('--primary', 'hsl(263 85% 62%)')),

        kidBlue: createColor(getVar('--kid-blue', 'hsl(197 90% 58%)')),
        kidGreen: createColor(getVar('--kid-green', 'hsl(140 80% 55%)')),
        kidPink: createColor(getVar('--kid-pink', 'hsl(330 85% 65%)')),
        kidYellow: createColor(getVar('--kid-yellow', 'hsl(48 95% 58%)')),

        success: createColor(getVar('--success', 'hsl(140 80% 55%)')),
        warning: createColor(getVar('--warning', 'hsl(38 95% 58%)')),
        red: createColor(getVar('--destructive', 'hsl(0 84% 65%)')),
    },

    autoContrast: true,

    headings: {
        fontFamily: 'Fredoka, Nunito, sans-serif',
        fontWeight: '800',
        sizes: {
            h1: { fontSize: '2.5rem', lineHeight: '1.2' },
            h2: { fontSize: '2rem', lineHeight: '1.3' },
            h3: { fontSize: '1.5rem', lineHeight: '1.3' },
            h4: { fontSize: '1.25rem', lineHeight: '1.4' },
            h5: { fontSize: '1.1rem', lineHeight: '1.4' },
            h6: { fontSize: '1rem', lineHeight: '1.4' },
        },
    },

    components: {
        // 🔥 BUTTON (главный интерактив)
        Button: {
            defaultProps: {
                radius: 'xl',
                size: 'lg',
            },
            styles: {
                root: {
                    fontWeight: 800,
                    letterSpacing: '0.4px',
                    boxShadow: '0 6px 0 rgba(0,0,0,0.15)',
                    transition: 'all 0.15s ease',
                    transform: 'translateY(0)',

                    '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 8px 0 rgba(0,0,0,0.18)',
                    },

                    '&:active': {
                        transform: 'translateY(2px)',
                        boxShadow: '0 2px 0 rgba(0,0,0,0.2)',
                    },
                },
            },
        },

        // 🔥 INPUT / TEXTINPUT
        Input: {
            defaultProps: {
                radius: 'md',
                size: 'md',
            },
            styles: {
                input: {
                    fontWeight: 600,
                    border: '2px solid transparent',
                    transition: 'all 0.15s ease',

                    '&:focus': {
                        borderColor: 'var(--mantine-color-violet-6)',
                        boxShadow: '0 0 0 3px rgba(130, 87, 229, 0.2)',
                    },
                },
            },
        },

        // 🔥 CARD
        Card: {
            defaultProps: {
                radius: 'xl',
                shadow: 'sm',
                padding: 'lg',
            },
            styles: {
                root: {
                    transition: 'all 0.2s ease',
                    border: '2px solid transparent',

                    '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 12px 30px rgba(0,0,0,0.1)',
                    },
                },
            },
        },

        // 🔥 PAPER
        Paper: {
            defaultProps: {
                radius: 'xl',
            },
            styles: {
                root: {
                    transition: 'all 0.2s ease',
                },
            },
        },

        // 🔥 ACTION ICON
        ActionIcon: {
            defaultProps: {
                radius: 'xl',
                size: 'lg',
            },
            styles: {
                root: {
                    transition: 'all 0.15s ease',

                    '&:hover': {
                        transform: 'scale(1.1)',
                    },

                    '&:active': {
                        transform: 'scale(0.95)',
                    },
                },
            },
        },

        // 🔥 BADGE
        Badge: {
            styles: {
                root: {
                    fontWeight: 700,
                    letterSpacing: '0.3px',
                },
            },
        },

        // 🔥 TEXT
        Text: {
            styles: {
                root: {
                    fontWeight: 500,
                },
            },
        },

        // 🔥 TITLE
        Title: {
            styles: {
                root: {
                    fontWeight: 800,
                },
            },
        },

        // 🔥 MODAL
        Modal: {
            defaultProps: {
                radius: 'xl',
                centered: true,
            },
            styles: {
                content: {
                    borderRadius: '1.5rem',
                },
            },
        },

        // 🔥 SELECT / DROPDOWN
        Select: {
            defaultProps: {
                radius: 'md',
                size: 'md',
            },
        },

        // 🔥 TEXTAREA
        Textarea: {
            defaultProps: {
                radius: 'md',
            },
        },

        // 🔥 CHECKBOX / RADIO
        Checkbox: {
            styles: {
                input: {
                    cursor: 'pointer',
                },
                label: {
                    fontWeight: 600,
                    cursor: 'pointer',
                },
            },
        },

        Radio: {
            styles: {
                label: {
                    fontWeight: 600,
                    cursor: 'pointer',
                },
            },
        },

        // 🔥 TABS
        Tabs: {
            styles: {
                tab: {
                    fontWeight: 700,
                    transition: 'all 0.15s ease',

                    '&[data-active]': {
                        transform: 'scale(1.05)',
                    },
                },
            },
        },
    },
})

export const ThemeProvider = ({ children }: PropsWithChildren) => {
    return (
        <MantineProvider
            theme={createTheme(buildTheme())}
            defaultColorScheme="light"
        >
            {children}
        </MantineProvider>
    )
}
