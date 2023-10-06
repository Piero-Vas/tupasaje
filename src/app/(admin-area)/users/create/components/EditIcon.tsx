import {SVGProps} from 'react-html-props';

export const EditIcon: React.FC<SVGProps> = props => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <mask
        id="mask0_597_563"
        style={{maskType: 'alpha'}}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24">
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_597_563)">
        <path
          d="M19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
          fill="white"
        />
      </g>
    </svg>
  );
};