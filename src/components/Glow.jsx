export default function Glow() {
    return (
      <div
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1] bg-grayLight opacity-5 blur-3xl rounded-full flex justify-center items-center w-[20rem] h-[30rem] sm:w-[40rem] sm:h-[20rem] xs:w-[30rem] xs:h-[15rem]"
        style={{
          boxShadow: '0 0 50px 20px rgba(255, 255, 255, 1)',
        }}
      />
    );
  }  