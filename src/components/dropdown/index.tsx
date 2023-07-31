import React from "react";

function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>, setX: React.Dispatch<React.SetStateAction<boolean>>): void {
  React.useEffect(() => {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event: MouseEvent): void {
      if (ref.current != null && !ref.current.contains(event.target as Node)) {
        setX(false);
      }
    }
    // Bind the event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, setX]);
}

const Dropdown = (props: {
  button: JSX.Element;
  children: JSX.Element;
  classNames: string;
  animation?: string;
}): JSX.Element => {
  const { button, children, classNames, animation } = props;
  const wrapperRef = React.useRef<HTMLDivElement>(null); // Specify the HTMLDivElement type
  const [openWrapper, setOpenWrapper] = React.useState<boolean>(false); // Specify the boolean type
  useOutsideAlerter(wrapperRef, setOpenWrapper);

  return (
    <div ref={wrapperRef} className="relative flex">
      <div className="flex" onMouseDown={() => { setOpenWrapper((prevState) => !prevState); }}>
        {button}
      </div>
      <div
        className={`${classNames} absolute z-10 ${
          animation ?? "origin-top-right transition-all duration-300 ease-in-out"
        } ${openWrapper ? "scale-100" : "scale-0"}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dropdown;
