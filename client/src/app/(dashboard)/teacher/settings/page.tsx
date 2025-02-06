import React from "react";
import SharedNotificationSettings from "@/components/SharedNotificationSettings";

const TeacherSettings = () => {
  return (
    <div className="W-3/5">
      <SharedNotificationSettings
        title="Configurações do Professor"
        subtitle="Gerencie suas configurações de notificação"
      />
    </div>
  );
};

export default TeacherSettings;
