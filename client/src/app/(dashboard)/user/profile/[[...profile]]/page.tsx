import Header from "@/components/Header";
import { UserProfile } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import React from "react";

const UserProfilePage = () => {
  return (
    <>
      <Header title="Perfil" subtitle="Informações pessoais" />
      <UserProfile
        path="/user/profile"
        routing="path"
        appearance={{
          baseTheme: dark,
          elements: {
            scrollBox: "bg-customgreys-darkGrey",
            navbar: {
              "& > div:nth-child(1)": {
                background: "none",
              },
              ".cl-internal-1dauvpw": {
                display: "none",
              },
            },
          },
        }}
      />
    </>
  );
};

export default UserProfilePage;
