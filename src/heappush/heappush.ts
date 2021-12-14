const inferNumber = (a: number | [number]) =>
  typeof a === "number" ? a : a[0];

const isNumeric = (a: unknown): a is number | [number] =>
  typeof a === "number" || (Array.isArray(a) && typeof a[0] === "number");

function bubbleUp<T>(q: T[], comp: (a: T, b: T) => number) {
  let ci = q.length - 1;

  while (ci > 0) {
    const pi = Math.floor((ci - 1) / 2);
    if (comp(q[pi], q[ci]) <= 0) break;

    // eslint-disable-next-line no-param-reassign
    [q[pi], q[ci]] = [q[ci], q[pi]];
    ci = pi;
  }
}

function heappush<T extends number | [number]>(q: T[], val: T): void;
function heappush<T>(q: T[], val: T, comp: (a: T, b: T) => number): void;
function heappush<T>(q: T[], val: T, comp?: (a: T, b: T) => number) {
  if (comp == null) {
    if (!isNumeric(val))
      throw new Error(
        "Provide compare function unless value is number or first element of value is priority, which type is number."
      );

    heappush(
      q as (T & (number | [number]))[],
      val,
      (a: T & (number | [number]), b: T & (number | [number])) =>
        inferNumber(a) - inferNumber(b)
    );

    return;
  }

  q.push(val);

  bubbleUp(q, comp);
}

export default heappush;
