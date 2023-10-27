import React from "react";

const useInsertionEffect =
  typeof window !== "undefined"
    ? React.useInsertionEffect || React.useLayoutEffect
    : () => {};

export function useEvent(callback) {
  const latestRef = React.useRef(useEvent_shouldNotBeInvokedBeforeMount);
  useInsertionEffect(() => {
    latestRef.current = callback;
  }, [callback]);

  const stableRef = React.useRef(null);
  if (!stableRef.current) {
    stableRef.current = function () {
      return latestRef.current.apply(this, arguments);
    };
  }

  return stableRef.current;
}

function useEvent_shouldNotBeInvokedBeforeMount() {
  throw new Error(
    "INVALID_USEEVENT_INVOCATION: the callback from useEvent cannot be invoked before the component has mounted."
  );
}
