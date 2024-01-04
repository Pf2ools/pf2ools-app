/* eslint-disable camelcase */
// You can also use the generator at https://skeleton.dev/docs/generator to create these values for you
import type { ThemeConfig } from './types';

export const RemasterGreen: ThemeConfig = {
	name: 'RemasterGreen',
	properties: {
		// =~= Theme Properties =~=
		'--theme-font-family-base': "'Quicksand', sans-serif",
		'--theme-font-family-heading': "'Teko', sans-serif",
		'--theme-font-color-base': 'var(--color-surface-800)',
		'--theme-font-color-dark': 'var(--color-tertiary-500)',
		'--theme-rounded-base': '8px',
		'--theme-rounded-container': '8px',
		'--theme-border-base': '1px',
		'--on-primary': '255 255 255',
		'--on-secondary': '0 0 0',
		'--on-tertiary': '0 0 0',
		'--on-success': '0 0 0',
		'--on-warning': '0 0 0',
		'--on-error': '255 255 255',
		'--on-surface': '255 255 255',
		// =~= Theme Colors  =~=
		// primary | #073622
		'--color-primary-50': '218 225 222', // #dae1de
		'--color-primary-100': '205 215 211', // #cdd7d3
		'--color-primary-200': '193 205 200', // #c1cdc8
		'--color-primary-300': '156 175 167', // #9cafa7
		'--color-primary-400': '81 114 100', // #517264
		'--color-primary-500': '7 54 34', // #073622
		'--color-primary-600': '6 49 31', // #06311f
		'--color-primary-700': '5 41 26', // #05291a
		'--color-primary-800': '4 32 20', // #042014
		'--color-primary-900': '3 26 17', // #031a11
		// secondary | #c2a200
		'--color-secondary-50': '246 241 217', // #f6f1d9
		'--color-secondary-100': '243 236 204', // #f3eccc
		'--color-secondary-200': '240 232 191', // #f0e8bf
		'--color-secondary-300': '231 218 153', // #e7da99
		'--color-secondary-400': '212 190 77', // #d4be4d
		'--color-secondary-500': '194 162 0', // #c2a200
		'--color-secondary-600': '175 146 0', // #af9200
		'--color-secondary-700': '146 122 0', // #927a00
		'--color-secondary-800': '116 97 0', // #746100
		'--color-secondary-900': '95 79 0', // #5f4f00
		// tertiary | #bbbbbb
		'--color-tertiary-50': '245 245 245', // #f5f5f5
		'--color-tertiary-100': '241 241 241', // #f1f1f1
		'--color-tertiary-200': '238 238 238', // #eeeeee
		'--color-tertiary-300': '228 228 228', // #e4e4e4
		'--color-tertiary-400': '207 207 207', // #cfcfcf
		'--color-tertiary-500': '187 187 187', // #bbbbbb
		'--color-tertiary-600': '168 168 168', // #a8a8a8
		'--color-tertiary-700': '140 140 140', // #8c8c8c
		'--color-tertiary-800': '112 112 112', // #707070
		'--color-tertiary-900': '92 92 92', // #5c5c5c
		// success | #82cb15
		'--color-success-50': '236 247 220', // #ecf7dc
		'--color-success-100': '230 245 208', // #e6f5d0
		'--color-success-200': '224 242 197', // #e0f2c5
		'--color-success-300': '205 234 161', // #cdeaa1
		'--color-success-400': '168 219 91', // #a8db5b
		'--color-success-500': '130 203 21', // #82cb15
		'--color-success-600': '117 183 19', // #75b713
		'--color-success-700': '98 152 16', // #629810
		'--color-success-800': '78 122 13', // #4e7a0d
		'--color-success-900': '64 99 10', // #40630a
		// warning | #b19c4e
		'--color-warning-50': '243 240 228', // #f3f0e4
		'--color-warning-100': '239 235 220', // #efebdc
		'--color-warning-200': '236 230 211', // #ece6d3
		'--color-warning-300': '224 215 184', // #e0d7b8
		'--color-warning-400': '200 186 131', // #c8ba83
		'--color-warning-500': '177 156 78', // #b19c4e
		'--color-warning-600': '159 140 70', // #9f8c46
		'--color-warning-700': '133 117 59', // #85753b
		'--color-warning-800': '106 94 47', // #6a5e2f
		'--color-warning-900': '87 76 38', // #574c26
		// error | #a93d0f
		'--color-error-50': '242 226 219', // #f2e2db
		'--color-error-100': '238 216 207', // #eed8cf
		'--color-error-200': '234 207 195', // #eacfc3
		'--color-error-300': '221 177 159', // #ddb19f
		'--color-error-400': '195 119 87', // #c37757
		'--color-error-500': '169 61 15', // #a93d0f
		'--color-error-600': '152 55 14', // #98370e
		'--color-error-700': '127 46 11', // #7f2e0b
		'--color-error-800': '101 37 9', // #652509
		'--color-error-900': '83 30 7', // #531e07
		// surface | #333333
		'--color-surface-50': '224 224 224', // #e0e0e0
		'--color-surface-100': '214 214 214', // #d6d6d6
		'--color-surface-200': '204 204 204', // #cccccc
		'--color-surface-300': '173 173 173', // #adadad
		'--color-surface-400': '112 112 112', // #707070
		'--color-surface-500': '51 51 51', // #333333
		'--color-surface-600': '46 46 46', // #2e2e2e
		'--color-surface-700': '38 38 38', // #262626
		'--color-surface-800': '31 31 31', // #1f1f1f
		'--color-surface-900': '25 25 25', // #191919
		// interact | #337AB7
		'--color-interact-50': '224 235 244', // #e0ebf4
		'--color-interact-100': '214 228 241', // #d6e4f1
		'--color-interact-200': '204 222 237', // #ccdeed
		'--color-interact-300': '173 202 226', // #adcae2
		'--color-interact-400': '112 162 205', // #70a2cd
		'--color-interact-500': '51 122 183', // #337AB7
		'--color-interact-600': '46 110 165', // #2e6ea5
		'--color-interact-700': '38 92 137', // #265c89
		'--color-interact-800': '31 73 110', // #1f496e
		'--color-interact-900': '25 60 90', // #193c5a
	},
	properties_dark: {},
};
