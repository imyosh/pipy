import { cn } from "@/lib/utils"
import { ReloadIcon } from "@radix-ui/react-icons"

export default function Loader({
  isLoading,
  className,
  containerClassName,
}: {
  isLoading: boolean
  className?: string
  containerClassName?: string
}) {
  return (
    <div className={containerClassName}>
      {isLoading && (
        <ReloadIcon
          className={cn(
            "w-[2.1rem h-[2.1rem] animate-spin 2xl:h-[2.4rem] 2xl:w-[2.4rem]",
            className
          )}
        />
      )}
    </div>
  )
}
