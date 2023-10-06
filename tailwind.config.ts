import type {Config} from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      borderRadius: {
        br42: '42px',
        br18: '18px',
        br11: '11px',
      },
      colors: {
        appLayout: '#F7F7F8',
        btnWarning: '#F2BA49',
        sidebarBgSecondary: '#3381FF',
        primary: '#176FEB',
        secondary: '#619EFF',
        tertiary: '#2654BF',
        bgred: '#ED4765',
        bggris: '#62626A',
        bgblack: '#45454A',
        bgpage: '#FAFAFA',
        bginput: '#EFEFF0',
        thcolor: '#e8f0fd',
        textGreen: '#34D190',
        textMuted: '#343438',
        textMutedStrong: '#343438D9',
        bgCommonInput: '#F2F2F3',
        textStepsMuted: '#34343866',
        textStepsChecked: '#4185EF',
        borderLayout: '#BEBEC0',
        borderPane: '#D8D8D9',
        borderPaneAlt: '#DDDDDE',
        bgSearchInput: '#EDEDEE',
        bgAlertMessage: '#ED6F47',
        bgChipMuted: '#7E7D82',
        bgBorderBusFloor: '#CFCFD1',
        bgPrimaryLinkHover: '#228EF4',
        bgSideBarIconHover: '#0E4EC7',
        bgColumnButtonBackground: '#FCEDCF',
        bgSeatChip: '#D6E6FF',
        bgSeatChipHover: '#99C1FF',
        textSeatChipStrong: '#2965D6',
        bgWhatsApp: '#25D366',
        // '': '#BDD7FF',
      },
      fontSize: {
        xxs: '10px',
        xxxs: '9px',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    // ´false´ means to only ´light´ and ´dark´ themes
    // themes: false,
    theme: 'light',
  },
};

export default config;
