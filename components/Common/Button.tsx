import Link, { LinkProps } from "next/link"
import clsx from "classnames"

export type ButtonProps = {
  rounded?: boolean
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

const Button = ({ rounded = false, className = "", ...props }: ButtonProps) => {
  const btnClassName = clsx(`btn btn-ghost btn-sm`, rounded ? "btn-circle" : "", className)
  return <button {...props} className={btnClassName}></button>
}

type LinkButtonProps = React.PropsWithChildren<
  { rounded?: boolean; className?: string } & LinkProps
>

export const LinkButton = ({
  rounded = false,
  className = "",
  children,
  ...linkProps
}: LinkButtonProps) => {
  const btnClassName = clsx(`btn btn-ghost btn-sm`, rounded ? "btn-circle" : "", className)
  return (
    <Link scroll={false} {...linkProps}>
      <a className={btnClassName}>{children}</a>
    </Link>
  )
}

export default Button
