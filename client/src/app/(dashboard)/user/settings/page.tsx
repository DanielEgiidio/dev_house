import React from "react";
import SharedNotificationSettings from "@/components/SharedNotificationSettings";

const UserSettings = () => {
  return (
    <div className="W-3/5">
      <SharedNotificationSettings
        title="Configurações do Usuário"
        subtitle="Gerencie suas configurações de notificação"
      />
    </div>
  );
};

export default UserSettings;
