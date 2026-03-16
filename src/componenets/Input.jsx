import { useId,forwardRef } from "react"

const Input =   React.forwardRef(function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref) {
    const id = useId()
  return (
    <div>
        {label && <label
            htmlFor={id}>
                {label}
            </label>
        }
        <input
            className = {`${className}`}
            type={type}
            ref={ref}
            {...props}
            id = {id}
        />
    </div>
  )
})

export default Input


