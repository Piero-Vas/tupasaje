import {SVGProps} from 'react-html-props';

interface Props extends SVGProps {
  seatBgColor?: string;
  seatBorderColor?: string;
}

export const DefaultSeatIcon: React.FC<Props> = ({
  seatBgColor = '#EBEBED',
  seatBorderColor = '#CACACC',
  ...rest
}) => {
  return (
    <svg
      width="70"
      height="70"
      viewBox="0 0 46 43"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}>
      <path
        d="M34.5526 0.42334H11.6377C7.74365 0.42334 4.58691 3.56071 4.58691 7.43086V30.6433C4.58691 34.5134 7.74365 37.6508 11.6377 37.6508H34.5526C38.4467 37.6508 41.6034 34.5134 41.6034 30.6433V7.43086C41.6034 3.56071 38.4467 0.42334 34.5526 0.42334Z"
        fill={seatBgColor}
        stroke={seatBorderColor}
        strokeWidth="0.5"
        strokeMiterlimit="10"
      />
      <path
        d="M45.1819 10.9609C45.1819 8.9968 43.5799 7.40459 41.6036 7.40459C39.6274 7.40459 38.0254 8.9968 38.0254 10.9609V34.5324C38.0254 36.4965 39.6274 38.0888 41.6036 38.0888C43.5799 38.0888 45.1819 36.4965 45.1819 34.5324V10.9609Z"
        fill={seatBgColor}
        stroke={seatBorderColor}
        strokeWidth="0.5"
        strokeMiterlimit="10"
      />
      <path
        d="M8.15652 10.9609C8.15652 8.9968 6.55448 7.40459 4.57826 7.40459C2.60204 7.40459 1 8.9968 1 10.9609V34.5324C1 36.4965 2.60204 38.0888 4.57826 38.0888C6.55448 38.0888 8.15652 36.4965 8.15652 34.5324V10.9609Z"
        fill={seatBgColor}
        stroke={seatBorderColor}
        strokeWidth="0.5"
        strokeMiterlimit="10"
      />
      <path
        d="M39.1446 30.2403H7.046C3.71174 30.2403 1.00879 32.9267 1.00879 36.2405C1.00879 39.5543 3.71174 42.2407 7.046 42.2407H39.1446C42.4789 42.2407 45.1818 39.5543 45.1818 36.2405C45.1818 32.9267 42.4789 30.2403 39.1446 30.2403Z"
        fill={seatBgColor}
        stroke={seatBorderColor}
        strokeWidth="0.5"
        strokeMiterlimit="10"
      />
    </svg>
  );
};
