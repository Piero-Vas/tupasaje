import {usePathname} from 'next/navigation';
import {cn} from '@/utils/cn';
import Link from 'next/link';

const steps = [
  {
    title: 'Datos generales',
    url: '/itinerary-admin/create/first-step',
  },
  {title: 'Precios base', url: '/itinerary-admin/create/second-step'},
  // {title: 'Precios por columna', url: '/itinerary-admin/create/third-step'},
  // {title: 'Precios por asientos', url: '/itinerary-admin/create/fourth-step'},
];

export const Steps: React.FC = () => {
  const pathname = usePathname();

  const currentStepIndex = steps.findIndex(step =>
    pathname.startsWith(step.url),
  );

  return (
    <div className="">
      <ul className="steps steps-vertical">
        {steps.map(({title, url}, key) => (
          <li
            key={key}
            className={cn(
              'step',
              key === currentStepIndex || key < currentStepIndex
                ? 'step-primary text-textStepsChecked font-medium'
                : 'text-textStepsMuted',
            )}>
            <Link href={url}>{title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};
