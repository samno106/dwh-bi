export const Footer = () => {
  return (
    <div className="flex justify-center my-5 pb-4">
      <span className="text-xs text-gray-500">
        &copy; {new Date().getFullYear()} Power by CPB.IT Department
      </span>
    </div>
  );
};

export default Footer;
