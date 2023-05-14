type Props = {
  children: React.ReactNode;
  border?: boolean;
};

export default function MenuBox({ children, border }: Props) {
  return (
    <div
      className={`w-[60px] h-[60px] text-[25px] lg:w-[80px] lg:h-[80px] flex justify-center items-center p-2 hover:bg-green-light hover:text-white lg:text-[30px]
        ${border && 'border-b-4  border-pink-500 lg:border-r-4 lg:border-b-0'}
      `}
    >
      {children}
    </div>
  );
}
