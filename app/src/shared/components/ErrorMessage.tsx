
interface Props {
  message?: string;
}

export const ErrorMessage = ({ message }: Props) => {
  if (!message) return null;

  return (
    <span className="text-red-400 text-xs font-bold self-start  mb-4 -mt-4 drop-shadow-[0_0_8px_#f87171] animate-in fade-in slide-in-from-top-1 duration-200">
      ⚠ {message}
    </span>
  );
};
