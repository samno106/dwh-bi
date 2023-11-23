import {
  ChevronsUpDown,
  Cross,
  CrossIcon,
  Search,
  Timer,
  X,
} from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Checkbox } from "./ui/checkbox";

export type SelectOption = {
  label: string;
  value: string;
};

export type SelectedOption = {
  value: string;
};

type SelectProps = {
  options: SelectOption[];
  value: SelectOption[];
  placholder: string;
  onChange: (value: SelectOption[]) => void;
};

export function SnSelect({
  value,
  onChange,
  options,
  placholder,
}: SelectProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const [isChecked, setIsChecked] = useState([""]);

  const clearOpt = () => {
    onChange([]);
    setIsChecked([""]);
  };

  const selectedOpt = (opt: SelectOption) => {
    if (value.includes(opt)) {
      onChange(value.filter((o) => o !== opt));
      setIsChecked(isChecked.filter((i) => i !== opt.value));
    } else {
      setIsChecked([...isChecked, opt.value]);
      onChange([...value, opt]);
    }
  };

  const selectdAll = () => {
    if (value.length === options.length) {
      onChange([]);
      setIsChecked([""]);
    } else {
      var arr = Array("");
      options.map((val) => {
        arr.push(val.value);
      });
      setIsChecked(arr);
      onChange(options);
    }
  };

  return (
    <div className="mx-2 relative">
      <div
        onClick={() => setOpen(!open)}
        tabIndex={0}
        className="relative hover:cursor-pointer w-[200px] h-10 px-1 border border-gray-200 rounded-md flex justify-between items-center"
      >
        {value.length ? (
          <>
            {value.slice(0, 2).map((val) => (
              <div
                key={val.value}
                className={cn(
                  "p-1 mx-1 border border-gray-200 rounded text-[9px] font-medium bg-slate-100  items-center",
                  value ? "flex" : "hidden"
                )}
              >
                <span className="px-1">{val.value}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  className="w-3 h-3 hover:text-red-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    selectedOpt(val);
                  }}
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
            {value.length > 2 ? (
              <div className="p-1 mx-1 border border-gray-200 rounded text-[10px] font-medium bg-slate-100  items-center">
                <span className="px-1">...</span>
              </div>
            ) : (
              <></>
            )}
          </>
        ) : (
          <span className="px-1 text-xs text-gray-400 ">{placholder}</span>
        )}

        <div className="flex items-center divide-x divide-gray-300 ">
          {value.length ? (
            <Button
              onClick={(e) => {
                e.stopPropagation();
                clearOpt();
              }}
              variant="ghost"
              size="icon"
              className="w-5 h-5 text-gray-500 mr-1"
            >
              <X className="w-3 h-3" />
            </Button>
          ) : (
            <></>
          )}

          <ChevronsUpDown className="w-4 h-4 text-gray-500" />
        </div>
      </div>
      {/* overlay */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          " bg-white bg-opacity-0  w-full h-screen left-0 top-0",
          open ? "fixed" : "hidden"
        )}
      ></div>
      {/* content */}
      <div
        className={cn(
          "z-50 bg-white py-2 w-[200px] rounded-md shadow-md border border-gray-200  h-auto max-h-60 overflow-y-auto",
          open ? "fixed" : "hidden"
        )}
      >
        <ul>
          <li className="pb-2 pt-1 px-3 text-xs text-gray-600">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                className="w-full focus:outline-none"
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </li>

          <li className="bg-blue-50 py-2 px-3 text-xs hover:cursor-pointer hover:bg-blue-50 text-gray-600">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="All"
                checked={value.length === options.length ? true : false}
                onCheckedChange={selectdAll}
              />
              <label
                htmlFor="All"
                className=" w-full ml-2 text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Select All
              </label>
            </div>
          </li>
          {options
            .filter((item) => item.value.toLowerCase().includes(search))
            .map((opt, index) => (
              <li
                key={index}
                className="py-2 px-3 text-xs hover:cursor-pointer hover:bg-blue-50 text-gray-600"
              >
                <div className="flex items-center">
                  <Checkbox
                    id={opt.value}
                    checked={isChecked.includes(opt.value)}
                    onCheckedChange={(checked) => {
                      return checked ? selectedOpt(opt) : null;
                    }}
                  />
                  <label
                    htmlFor={opt.value}
                    className=" ml-2 text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {opt.label}
                  </label>
                </div>
              </li>
            ))}
          <li>
            <div
              onClick={() => setOpen(!open)}
              className="p-2 hover:cursor-pointer text-center text-xs bg-blue-100 text-blue-600"
            >
              Done
            </div>
          </li>
        </ul>
      </div>
      {/* content */}
    </div>
  );
}
