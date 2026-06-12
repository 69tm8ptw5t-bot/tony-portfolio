'use client'

import { useTransitionNav } from './TransitionContext'

interface Props {
  href: string
  children: React.ReactNode
  className?: string
  style?: React.CSSProperties
  [key: string]: any
}

export default function TransitionLink({ href, children, className, style, ...rest }: Props) {
  const { navigate } = useTransitionNav()

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    navigate(href)
  }

  return (
    <a href={href} onClick={handleClick} className={className} style={style} {...rest}>
      {children}
    </a>
  )
}