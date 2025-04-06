type Props = {
  children: React.ReactNode;
  border?: boolean;
  onClick?: () => void;
};

export default function MenuBox({ children, border, onClick }: Props) {
  return (
    <div
      onClick={onClick}
      className={`w-[60px] h-[60px] text-[25px] lg:w-[80px] lg:h-[80px] flex justify-center items-center p-2 hover:bg-accent text-white lg:text-[30px] cursor-pointer
        ${border && 'border-b-4  border-pink-300 lg:border-r-4 lg:border-b-0'}
      `}
    >
      {children}
    </div>
  );
}
