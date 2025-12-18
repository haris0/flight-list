interface HeaderProps {
  departure?: string;
  arival?: string;
  date?: string;
}

const Header = ({
  departure,
  arival,
  date,
}: HeaderProps) => {
  return (
    <header
      className="sticky top-0 md:top-3 p-4 h-28 md:h-fit shadow-md text-white md:m-3 md:rounded-xl text-sm bg-[#00275a] z-10"
    >
      <div>
        {departure} ⇒ {arival}
      </div>
      <div className="text-xs">
        {date}
      </div>
    </header>
  );
};

export default Header;
