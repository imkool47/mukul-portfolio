
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				// VS Code theme colors
				dracula: {
					background: '#282a36',
					foreground: '#f8f8f2',
					selection: '#44475a',
					comment: '#6272a4',
					red: '#ff5555',
					orange: '#ffb86c',
					yellow: '#f1fa8c',
					green: '#50fa7b',
					purple: '#bd93f9',
					cyan: '#8be9fd',
					pink: '#ff79c6',
				},
				monokai: {
					background: '#272822',
					foreground: '#f8f8f2',
					selection: '#49483e',
					comment: '#75715e',
					red: '#f92672',
					orange: '#fd971f',
					yellow: '#e6db74',
					green: '#a6e22e',
					blue: '#66d9ef',
					purple: '#ae81ff',
				},
				nord: {
					background: '#2e3440',
					foreground: '#d8dee9',
					selection: '#434c5e',
					comment: '#4c566a',
					red: '#bf616a',
					orange: '#d08770',
					yellow: '#ebcb8b',
					green: '#a3be8c',
					blue: '#81a1c1',
					purple: '#b48ead',
				},
				catppuccin: {
					background: '#1e1e2e',
					foreground: '#cdd6f4',
					selection: '#313244',
					comment: '#6c7086',
					red: '#f38ba8',
					orange: '#fab387',
					yellow: '#f9e2af',
					green: '#a6e3a1',
					blue: '#89b4fa',
					purple: '#cba6f7',
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"cursor-blink": {
					"0%, 100%": { opacity: "1" },
					"50%": { opacity: "0" }
				},
				"fade-in": {
					"0%": { opacity: "0" },
					"100%": { opacity: "1" }
				},
				"typing": {
					"0%": { width: "0" },
					"100%": { width: "100%" }
				}
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"cursor-blink": "cursor-blink 1s step-end infinite",
				"fade-in": "fade-in 0.5s ease-out",
				"typing": "typing 3.5s steps(40, end)"
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;