import plugin from 'tailwindcss/plugin.js';

const colorPalette = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900];
const colorNames = ['interact'];
const colorPairings = [
	// forward:
	{ light: 50, dark: 900 },
	{ light: 100, dark: 900 },
	{ light: 100, dark: 800 },
	{ light: 200, dark: 700 },
	{ light: 300, dark: 600 },
	{ light: 400, dark: 500 },
	{ light: 400, dark: 600 },
	// backwards:
	{ light: 900, dark: 50 },
	{ light: 900, dark: 100 },
	{ light: 800, dark: 100 },
	{ light: 700, dark: 200 },
	{ light: 600, dark: 300 },
	{ light: 600, dark: 400 },
	{ light: 500, dark: 400 },
];

function createPalette(word, palette = colorPalette) {
	return palette
		.map((value) => ({
			[value]: `rgb(var(--color-${word}-${value}) / <alpha-value>)`,
		}))
		.reduce((acc, curr) => ({ ...acc, ...curr }), {});
}

const colors = {};
colorNames.forEach((name) => {
	colors[name] = createPalette(name);
});

// Defaults
const backdropAlpha = 0.7;
const hoverAlpha = 0.1;

// https://github.com/skeletonlabs/skeleton/blob/dev/packages/plugin/src/tailwind/tokens/text.ts
export default plugin(
	({ addUtilities }) => {
		const classes = {};

		colorNames.forEach((name) => {
			classes[`.text-on-${name}-token`] = { color: `rgb(var(--on-${name}))` };

			colorPairings.forEach((pair) => {
				classes[`.text-${name}-${pair.light}-${pair.dark}-token`] = {
					color: `rgb(var(--color-${name}-${pair.light}))`,
				};
				classes[`.dark .text-${name}-${pair.light}-${pair.dark}-token`] = {
					color: `rgb(var(--color-${name}-${pair.dark}))`,
				};
			});

			// Color Pairings
			// Example: .bg-primary-50-900-token | .bg-primary-900-50-token
			colorPairings.forEach((pair) => {
				classes[`.bg-${name}-${pair.light}-${pair.dark}-token`] = {
					'background-color': `rgb(var(--color-${name}-${pair.light}))`,
				};
				classes[`.dark .bg-${name}-${pair.light}-${pair.dark}-token`] = {
					'background-color': `rgb(var(--color-${name}-${pair.dark}))`,
				};
			});

			// Backdrops
			// Example: .bg-primary-backdrop-token
			classes[`.bg-${name}-backdrop-token`] = {
				'background-color': `rgb(var(--color-${name}-400) / ${backdropAlpha})`,
			};
			classes[`.dark .bg-${name}-backdrop-token`] = {
				'background-color': `rgb(var(--color-${name}-900) / ${backdropAlpha})`,
			};

			// Hover
			// Example: .bg-primary-hover-token
			classes[`.bg-${name}-hover-token:hover`] = {
				'background-color': `rgb(var(--color-${name}-500) / ${hoverAlpha})`,
			};
			classes[`.dark .bg-${name}-hover-token:hover`] = {
				'background-color': `rgb(var(--color-${name}-500) / ${hoverAlpha})`,
			};

			// Active
			// Example: .bg-primary-active-token
			classes[`.bg-${name}-active-token`] = {
				'background-color': `rgb(var(--color-${name}-500)) !important`,
				color: `rgb(var(--on-${name}))`,
				fill: `rgb(var(--on-${name}))`,
			};
		});

		colorNames.forEach((name) => {
			// On-X Fill Colors
			// Example: .fill-on-primary-token
			classes[`.fill-on-${name}-token`] = { fill: `rgb(var(--on-${name}))` };
		});

		addUtilities(classes);
	},
	{ theme: { colors } }
);
