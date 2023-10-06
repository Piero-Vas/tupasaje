import {SVGProps} from 'react-html-props';

export const CoinDashedIcon: React.FC<SVGProps> = props => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={24}
    fill="none"
    {...props}>
    <mask
      id="a"
      width={24}
      height={24}
      x={0}
      y={0}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}>
      <path fill="#D9D9D9" d="M0 0h24v24H0z" />
    </mask>
    <g mask="url(#a)">
      <path
        fill="#ED6F47"
        d="M14.35 8.55c-.2-.5-.5-.9-.89-1.17-.39-.29-.86-.43-1.41-.43-.3 0-.6.04-.87.13-.29.08-.55.24-.78.47L8.95 6.1c.23-.23.55-.45.95-.64.4-.19.77-.31 1.1-.36V3h2v2.05a4.19 4.19 0 0 1 3.25 2.7l-1.9.8ZM19.8 22.6 15.2 18c-.25.25-.6.45-1.02.61a4.8 4.8 0 0 1-1.18.29V21h-2v-2.15a4.97 4.97 0 0 1-3.7-3.6l2-.8c.2.7.54 1.3 1.01 1.8.48.5 1.1.75 1.89.75a2.86 2.86 0 0 0 1.55-.45L1.4 4.2l1.4-1.4 18.4 18.4-1.4 1.4Z"
      />
    </g>
  </svg>
);
