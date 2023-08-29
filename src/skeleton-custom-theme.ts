
import type { CustomThemeConfig } from '@skeletonlabs/tw-plugin';

export const myCustomTheme: CustomThemeConfig = {
    name: 'my-custom-theme',
    properties: {
        // =~= Theme Properties =~=
        "--theme-font-family-base": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
        "--theme-font-family-heading": "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas",
        "--theme-font-color-base": "0 0 0",
        "--theme-font-color-dark": "255 255 255",
        "--theme-rounded-base": "9999px",
        "--theme-rounded-container": "12px",
        "--theme-border-base": "2px",
        // =~= Theme On-X Colors =~=
        "--on-primary": "255 255 255",
        "--on-secondary": "0 0 0",
        "--on-tertiary": "0 0 0",
        "--on-success": "0 0 0",
        "--on-warning": "0 0 0",
        "--on-error": "0 0 0",
        "--on-surface": "255 255 255",
        // =~= Theme Colors  =~=
        // primary | #2d0620 
        "--color-primary-50": "224 218 222", // #e0dade
        "--color-primary-100": "213 205 210", // #d5cdd2
        "--color-primary-200": "203 193 199", // #cbc1c7
        "--color-primary-300": "171 155 166", // #ab9ba6
        "--color-primary-400": "108 81 99", // #6c5163
        "--color-primary-500": "45 6 32", // #2d0620
        "--color-primary-600": "41 5 29", // #29051d
        "--color-primary-700": "34 5 24", // #220518
        "--color-primary-800": "27 4 19", // #1b0413
        "--color-primary-900": "22 3 16", // #160310
        // secondary | #ec73f1 
        "--color-secondary-50": "252 234 253", // #fceafd
        "--color-secondary-100": "251 227 252", // #fbe3fc
        "--color-secondary-200": "250 220 252", // #fadcfc
        "--color-secondary-300": "247 199 249", // #f7c7f9
        "--color-secondary-400": "242 157 245", // #f29df5
        "--color-secondary-500": "236 115 241", // #ec73f1
        "--color-secondary-600": "212 104 217", // #d468d9
        "--color-secondary-700": "177 86 181", // #b156b5
        "--color-secondary-800": "142 69 145", // #8e4591
        "--color-secondary-900": "116 56 118", // #743876
        // tertiary | #c051ad 
        "--color-tertiary-50": "246 229 243", // #f6e5f3
        "--color-tertiary-100": "242 220 239", // #f2dcef
        "--color-tertiary-200": "239 212 235", // #efd4eb
        "--color-tertiary-300": "230 185 222", // #e6b9de
        "--color-tertiary-400": "211 133 198", // #d385c6
        "--color-tertiary-500": "192 81 173", // #c051ad
        "--color-tertiary-600": "173 73 156", // #ad499c
        "--color-tertiary-700": "144 61 130", // #903d82
        "--color-tertiary-800": "115 49 104", // #733168
        "--color-tertiary-900": "94 40 85", // #5e2855
        // success | #90aa6e 
        "--color-success-50": "238 242 233", // #eef2e9
        "--color-success-100": "233 238 226", // #e9eee2
        "--color-success-200": "227 234 219", // #e3eadb
        "--color-success-300": "211 221 197", // #d3ddc5
        "--color-success-400": "177 196 154", // #b1c49a
        "--color-success-500": "144 170 110", // #90aa6e
        "--color-success-600": "130 153 99", // #829963
        "--color-success-700": "108 128 83", // #6c8053
        "--color-success-800": "86 102 66", // #566642
        "--color-success-900": "71 83 54", // #475336
        // warning | #048754 
        "--color-warning-50": "217 237 229", // #d9ede5
        "--color-warning-100": "205 231 221", // #cde7dd
        "--color-warning-200": "192 225 212", // #c0e1d4
        "--color-warning-300": "155 207 187", // #9bcfbb
        "--color-warning-400": "79 171 135", // #4fab87
        "--color-warning-500": "4 135 84", // #048754
        "--color-warning-600": "4 122 76", // #047a4c
        "--color-warning-700": "3 101 63", // #03653f
        "--color-warning-800": "2 81 50", // #025132
        "--color-warning-900": "2 66 41", // #024229
        // error | #f4b171 
        "--color-error-50": "253 243 234", // #fdf3ea
        "--color-error-100": "253 239 227", // #fdefe3
        "--color-error-200": "252 236 220", // #fcecdc
        "--color-error-300": "251 224 198", // #fbe0c6
        "--color-error-400": "247 200 156", // #f7c89c
        "--color-error-500": "244 177 113", // #f4b171
        "--color-error-600": "220 159 102", // #dc9f66
        "--color-error-700": "183 133 85", // #b78555
        "--color-error-800": "146 106 68", // #926a44
        "--color-error-900": "120 87 55", // #785737
        // surface | #451f9d 
        "--color-surface-50": "227 221 240", // #e3ddf0
        "--color-surface-100": "218 210 235", // #dad2eb
        "--color-surface-200": "209 199 231", // #d1c7e7
        "--color-surface-300": "181 165 216", // #b5a5d8
        "--color-surface-400": "125 98 186", // #7d62ba
        "--color-surface-500": "69 31 157", // #451f9d
        "--color-surface-600": "62 28 141", // #3e1c8d
        "--color-surface-700": "52 23 118", // #341776
        "--color-surface-800": "41 19 94", // #29135e
        "--color-surface-900": "34 15 77", // #220f4d

    }
}