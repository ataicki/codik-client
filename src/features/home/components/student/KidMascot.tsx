import { Box } from '@mantine/core'
import { motion } from 'framer-motion'

export const KidMascot = () => (
    <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
    >
        <Box
            component="svg"
            viewBox="0 0 120 140"
            w={{ base: 100, sm: 120 }}
            h={{ base: 120, sm: 140 }}
            aria-hidden
        >
            <defs>
                <linearGradient id="mascotBody" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(263 85% 68%)" />
                    <stop offset="100%" stopColor="hsl(280 75% 55%)" />
                </linearGradient>
                <linearGradient id="mascotFace" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="hsl(48 95% 88%)" />
                    <stop offset="100%" stopColor="hsl(38 90% 82%)" />
                </linearGradient>
            </defs>
            <ellipse cx="60" cy="118" rx="44" ry="10" fill="hsl(263 40% 50% / 0.2)" />
            <path
                d="M24 52 C24 28 40 12 60 12 C80 12 96 28 96 52 L96 78 C96 96 82 108 60 108 C38 108 24 96 24 78 Z"
                fill="url(#mascotBody)"
                stroke="hsl(263 50% 40%)"
                strokeWidth="2.5"
            />
            <ellipse cx="60" cy="48" rx="36" ry="34" fill="url(#mascotFace)" stroke="hsl(263 40% 45%)" strokeWidth="2" />
            <ellipse cx="44" cy="46" rx="8" ry="10" fill="hsl(222 47% 11%)" />
            <ellipse cx="76" cy="46" rx="8" ry="10" fill="hsl(222 47% 11%)" />
            <ellipse cx="46" cy="44" rx="3" ry="4" fill="white" />
            <ellipse cx="78" cy="44" rx="3" ry="4" fill="white" />
            <path
                d="M44 64 Q60 76 76 64"
                fill="none"
                stroke="hsl(330 70% 45%)"
                strokeWidth="3"
                strokeLinecap="round"
            />
            <circle cx="28" cy="38" r="6" fill="hsl(48 95% 58%)" opacity="0.9" />
            <circle cx="92" cy="38" r="6" fill="hsl(197 90% 58%)" opacity="0.9" />
            <path
                d="M60 2 L68 18 L52 18 Z"
                fill="hsl(263 85% 62%)"
                stroke="hsl(263 50% 40%)"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </Box>
    </motion.div>
)
