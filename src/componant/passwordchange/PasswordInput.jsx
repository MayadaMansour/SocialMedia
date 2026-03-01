import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

export default function PasswordInput({ label, value, onChange }) {

  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1">

      <label className="text-sm text-gray-600">
        {label}
      </label>

      <div className="relative">

        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={onChange}
          className="w-full border rounded-lg px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-400"
          required
        />

        <button
          type="button"
          onClick={() => setShow(!show)}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
        >
          {show ? <FiEyeOff /> : <FiEye />}
        </button>

      </div>
    </div>
  );
}