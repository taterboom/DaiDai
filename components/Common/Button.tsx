type ButtonProps = {
  className?: string
  rounded?: boolean
  children: React.ReactNode
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const Button = ({ rounded = false, className = "", children, onClick }: ButtonProps) => {
  return (
    <button
      className={`${
        rounded ? "p-2 rounded-full" : "px-4 py-1 rounded"
      } hover:shadow-ios active:bg-black/5 ${className}`}
      onClick={(e) => onClick?.(e)}
    >
      {children}
    </button>
  )
}

export default Button
