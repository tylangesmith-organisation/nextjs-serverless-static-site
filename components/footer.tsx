import Link from 'next/link'

interface FooterItemProps {
  href: string
  text: string
}

const FooterItem = (props: FooterItemProps) => {
  const { href, text } = props
  return (
    <li className="mb-2 sm:mb-0 sm:mr-4">
      <Link href={href}>
        <a className="font-black text-xl" target="_blank">{text}</a>
      </Link>
    </li>
  )
}

const Component = () => {
  return (
    <footer className="bg-gray-100 py-12">
      <div className="container mx-auto 2xl:max-w-7xl">
        <ul className="flex flex-col items-center sm:flex-row">
          <FooterItem href="https://tylangesmith.com" text="tylangesmith.com" />
          <FooterItem href="https://github.com/tylangesmith/" text="GitHub" />
          <FooterItem href="https://www.linkedin.com/in/tylangesmith/" text="LinkedIn" />
        </ul>
      </div>
    </footer>
  )
}

export default Component
