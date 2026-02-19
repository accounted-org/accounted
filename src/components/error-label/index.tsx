interface Props {
  text: string
}

export function ErrorLabel({ text }: Readonly<Props>) {
  return (
    <span className="w-full block font-semibold text-center text-red-400 italic text-sm">
      {text}
    </span>
  )
}
