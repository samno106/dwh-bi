const Logo =()=>{

    return(
        <div className="flex flex-row items-center">
          <div className="mr-2 bg-blue-700 rounded flex items-center justify-center w-10 h-10">
            <span className="font-semibold text-white text-sm text-center">
              CPB
            </span>
          </div>
          <div className="flex flex-col">
            <span className=" uppercase text-xs font-medium text-gray-600 mt-1">
              Datawarehouse
            </span>
            <span className="font-bold uppercase text-md text-gray-700">
              Cpbank.Bi
            </span>
          </div>
        </div>
        
    );
}
export default Logo;