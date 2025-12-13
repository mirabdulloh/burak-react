import React from "react";
import Cookie from "universal-cookie";
import { Member } from "../../lib/types/member";
import { GlobalContext } from "../hooks/useGlobals";

const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const cookies = new Cookie();
  if (!cookies.get("accessToken")) localStorage.removeItem("memberData");

  const [authMember, setAuthMember] = React.useState<Member | null>(
    localStorage.getItem("memberData")
      ? JSON.parse(localStorage.getItem("memberData") as string)
      : null
  );

  console.log("=== verify ===");
  return(<GlobalContext.Provider value={{authMember,setAuthMember}}>
    {children}
  </GlobalContext.Provider>)
  
};

export default ContextProvider;
