export function EmptyArchive() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="flex w-full flex-col items-center gap-y-4">
        <p className="text-slate-400">Your archive is empty.</p>
      </div>
    </div>
  );
}

export default EmptyArchive;
