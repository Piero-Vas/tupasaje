import {SVGProps} from 'react-html-props';

export const AddIcon: React.FC<SVGProps> = props => {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}>
      <mask
        id="mask0_693_3058"
        style={{maskType: 'alpha'}}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24">
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_693_3058)">
        <path
          d="M11 19V13H5V11H11V5H13V11H19V13H13V19H11Z"
          fill="currentColor"
        />
      </g>
    </svg>
  );
};
