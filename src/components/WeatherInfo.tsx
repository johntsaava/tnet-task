import clsx from "clsx";

export function Root({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLUListElement>,
  HTMLUListElement
>) {
  return <ul className={clsx("flex flex-col gap-2", className)} {...props} />;
}

export function Item({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.LiHTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>) {
  return (
    <li
      className={clsx("flex items-center justify-between", className)}
      {...props}
    />
  );
}

export function Label({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>) {
  return <span className={clsx("text-sm font-light", className)} {...props} />;
}

export function Value({
  className,
  ...props
}: React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLSpanElement>,
  HTMLSpanElement
>) {
  return <span className={clsx("text-xl", className)} {...props} />;
}
