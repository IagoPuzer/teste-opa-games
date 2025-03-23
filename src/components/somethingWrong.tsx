interface Props {
  className?: string;
}
export default function SomethingWrong({ className = "" }: Props) {
  return (
    <div
      className={`${className}
  m-auto flex flex-col items-center rounded-xl  p-4  sm:p-8 `}
    >
      <div className=" flex flex-col items-center">
        <h2 className="mb-2 text-3xl font-bold leading-8 text-black">
          Houve um comportamento inesperado ☹️
        </h2>
        <h3 className="mb-6 w-full text-sm text-black/60">
          Tente novamente em alguns instantes. Se o problema persistir, entre em
          contato com o nosso suporte.
        </h3>
      </div>
    </div>
  );
}
