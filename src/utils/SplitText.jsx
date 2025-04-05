const SplitText = ({ text, customCSS = {}, customClass }) => {
    return (
      <>
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`${customClass ?? ""} split-text-char`}
            style={{
              display: "inline-block",
              y: 20,
              ...customCSS,
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </>
    );
  };
  
  export default SplitText;
  