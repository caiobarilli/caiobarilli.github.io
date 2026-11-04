import { Fragment } from "react";

/** Text that may wrap only after "/", "@" or ".", never in the middle of a word (no overflow-wrap:anywhere). */
export function Breakable({ text }: { text: string }) {
  const parts = text.split(/(?<=[/@.])/);
  return (
    <>
      {parts.map((part, i) => (
        <Fragment key={i}>
          {i > 0 && <wbr />}
          {part}
        </Fragment>
      ))}
    </>
  );
}
