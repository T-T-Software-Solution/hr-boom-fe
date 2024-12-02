import Link from 'next/link';

const prefix = '/example';
const examples = [
  {
    name: 'use-axios',
    href: `${prefix}/use-axios`,
  },
  {
    name: 'use-fetch',
    href: `${prefix}/use-fetch`,
  },
  {
    name: 'use-openapi-fetch',
    href: `${prefix}/use-openapi-fetch`,
  },
  {
    name: 'use-openapi-react-query',
    href: `${prefix}/use-openapi-react-query`,
  },
];

export default function Example() {
  return (
    <section className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Examples</h1>
      <ul className="flex flex-col gap-2 list-disc">
        {examples.map((example) => (
          <li key={example.name}>
            <Link className="text-blue-500 underline" href={example.href}>
              {example.name}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
