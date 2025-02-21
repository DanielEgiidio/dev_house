import SharedNotificationSettings from "@/components/SharedNotificationSettings";
import React from "react";

const TeacherSettings = () => {
  return (
    <div className="w-3/5">
      <SharedNotificationSettings
        title="Configurações do Professor"
        subtitle="Gerencie suas configurações de notificação"
      />
    </div>
  );
};

export default TeacherSettings;
