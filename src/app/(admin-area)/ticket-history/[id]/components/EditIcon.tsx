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
        id="mask0_1452_277"
        style={{maskType: 'alpha'}}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="24"
        height="24">
        <rect width="24" height="24" fill="#D9D9D9" />
      </mask>
      <g mask="url(#mask0_1452_277)">
        <path
          d="M2 23.9997L2 19.9997L22 19.9997V23.9997L2 23.9997ZM4 17.9997L4 14.2497L13.05 5.19972L16.8 8.94972L7.75 17.9997H4ZM17.925 7.84972L14.175 4.09972L15.975 2.29972C16.1583 2.09972 16.3917 2.00389 16.675 2.01222C16.9583 2.02055 17.1917 2.11639 17.375 2.29972L19.725 4.64972C19.9083 4.83305 20 5.06222 20 5.33722C20 5.61222 19.9083 5.84972 19.725 6.04972L17.925 7.84972Z"
          fill="#4185EF"
        />
      </g>
    </svg>
  );
};
