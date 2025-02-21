"use client";

import {
  NotificationSettingsFormData,
  notificationSettingsSchema,
} from "@/lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUpdateUserMutation } from "@/state/api";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { useForm } from "react-hook-form";
import Header from "./Header";
import { Form } from "@/components/ui/form";
import { CustomFormField } from "./CustomFormField";
import { Button } from "@/components/ui/button";
import { Bell, Mail, MessageSquare, Settings } from "lucide-react";

const SharedNotificationSettings = ({
  title = "Configurações do Usuário",
  subtitle = "Gerencie suas configurações de notificação",
}: SharedNotificationSettingsProps) => {
  const { user } = useUser();
  const [updateUser] = useUpdateUserMutation();

  const currentSettings =
    (user?.publicMetadata as { settings?: UserSettings })?.settings || {};

  const methods = useForm<NotificationSettingsFormData>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      courseNotifications: currentSettings.courseNotifications || false,
      emailAlerts: currentSettings.emailAlerts || false,
      smsAlerts: currentSettings.smsAlerts || false,
      notificationFrequency: currentSettings.notificationFrequency || "daily",
    },
  });

  const onSubmit = async (data: NotificationSettingsFormData) => {
    if (!user) return;

    const updatedUser = {
      userId: user.id,
      publicMetadata: {
        ...user.publicMetadata,
        settings: {
          ...currentSettings,
          ...data,
        },
      },
    };

    try {
      await updateUser(updatedUser);
    } catch (error) {
      console.error("Failed to update user settings: ", error);
    }
  };

  if (!user)
    return <div>Por favor, faça login para gerenciar suas configurações.</div>;

  return (
    <div className="notification-settings bg-customgreys-primarybg p-8 rounded-xl border border-gray-800/50 shadow-lg">
      <Header title={title} subtitle={subtitle} />

      <Form {...methods}>
        <form
          onSubmit={methods.handleSubmit(onSubmit)}
          className="notification-settings__form space-y-8"
        >
          <div className="notification-settings__fields space-y-6">
            {/* Notificações dos Cursos */}
            <div className="bg-customgreys-secondarybg p-6 rounded-lg border border-gray-800/30">
              <div className="flex items-center gap-4 mb-4">
                <Bell className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">
                  Notificações dos Cursos
                </h3>
              </div>
              <CustomFormField
                name="courseNotifications"
                label="Receber notificações sobre novos cursos e atualizações"
                type="switch"
              />
            </div>

            {/* Notificações via E-mail */}
            <div className="bg-customgreys-secondarybg p-6 rounded-lg border border-gray-800/30">
              <div className="flex items-center gap-4 mb-4">
                <Mail className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">
                  Notificações via E-mail
                </h3>
              </div>
              <CustomFormField
                name="emailAlerts"
                label="Receber alertas importantes por e-mail"
                type="switch"
              />
            </div>

            {/* Notificações via SMS */}
            <div className="bg-customgreys-secondarybg p-6 rounded-lg border border-gray-800/30">
              <div className="flex items-center gap-4 mb-4">
                <MessageSquare className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">
                  Notificações via SMS
                </h3>
              </div>
              <CustomFormField
                name="smsAlerts"
                label="Receber alertas urgentes por SMS"
                type="switch"
              />
            </div>

            {/* Frequência das Notificações */}
            <div className="bg-customgreys-secondarybg p-6 rounded-lg border border-gray-800/30">
              <div className="flex items-center gap-4 mb-4">
                <Settings className="w-6 h-6 text-purple-400" />
                <h3 className="text-lg font-semibold text-white">
                  Frequência das Notificações
                </h3>
              </div>
              <CustomFormField
                name="notificationFrequency"
                label="Escolha a frequência das notificações"
                type="select"
                options={[
                  { value: "immediate", label: "Imediatamente" },
                  { value: "daily", label: "Diariamente" },
                  { value: "weekly", label: "Semanalmente" },
                ]}
              />
            </div>
          </div>

          {/* Botão de Envio */}
          <Button
            type="submit"
            className="w-[250px] bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-5 rounded-xl transition-all"
          >
            Atualizar Configurações
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default SharedNotificationSettings;
