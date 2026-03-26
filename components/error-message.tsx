type Props = {
  message: string;
};

export function ErrorMessage({ message }: Props) {
  return (
    <p className="p-2 bg-red-100 text-red-700 rounded-md" role="alert">
      {message}
    </p>
  );
}
