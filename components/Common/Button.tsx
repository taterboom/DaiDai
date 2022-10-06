import Link, { LinkProps } from "next/link"
import clsx from "classnames"

export type ButtonProps = {
  disableDefaultStyle?: boolean
  rounded?: boolean
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = ({
  rounded = false,
  className = "",
  disableDefaultStyle = false,
  ...props
}: ButtonProps) => {
  const btnClassName = clsx(
    `btn`,
    !disableDefaultStyle && `btn-ghost btn-sm`,
    rounded && "btn-circle",
    className
  )
  return <button {...props} className={btnClassName}></button>
}

type LinkButtonProps = React.PropsWithChildren<
  {
    rounded?: boolean
    className?: string
    disableDefaultStyle?: boolean
    title?: string
    onClick?: React.MouseEventHandler<HTMLAnchorElement>
  } & LinkProps
>

export const LinkButton = ({
  rounded = false,
  className = "",
  children,
  disableDefaultStyle = false,
  title,
  onClick,
  ...linkProps
}: LinkButtonProps) => {
  const btnClassName = clsx(
    `btn`,
    !disableDefaultStyle && `btn-ghost btn-sm`,
    rounded && "btn-circle",
    className
  )
  return (
    <Link scroll={false} {...linkProps}>
      <a className={btnClassName} title={title} onClick={onClick}>
        {children}
      </a>
    </Link>
  )
}

export default Button
