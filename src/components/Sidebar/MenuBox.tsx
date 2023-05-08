type Props = {
  children: React.ReactNode;
};

export default function MenuBox({ children }: Props) {
  return (
    <div
      className={`w-[60px] h-[60px] text-[25px] lg:w-[80px] lg:h-[80px] flex justify-center items-center p-2 hover:bg-green-light hover:text-white lg:text-[30px]`}
    >
      {children}
    </div>
  );
}
