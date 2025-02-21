"use client";

import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import React from "react";
import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  PlayCircle,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const CourseCardSearch = ({
  course,
  isSelected,
  onClick,
}: SearchCourseCardProps) => {
  // Calcular estatísticas do curso (exemplo)
  const totalChapters =
    course.sections?.reduce(
      (acc, section) => acc + section.chapters.length,
      0
    ) || 0;
  const contentTypes =
    course.sections?.reduce((acc, section) => {
      section.chapters.forEach((chapter) => {
        acc[chapter.type] = (acc[chapter.type] || 0) + 1;
      });
      return acc;
    }, {} as Record<string, number>) || {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group"
      onClick={onClick}
    >
      <motion.div
        className={`relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 ${
          isSelected ? "border-purple-500/50" : ""
        }`}
        whileHover={{ boxShadow: "0 10px 30px -15px rgba(138, 75, 175, 0.3)" }}
      >
        {/* Seção da Imagem */}
        <motion.div
          className="relative aspect-[16/9] overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={course.image || "/placeholder.png"}
            alt={course.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          {/* Badges */}
          <motion.div
            className="absolute top-4 left-4 flex flex-wrap gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-purple-500/90 text-white px-3 py-1 rounded-full text-sm">
              {course.category}
            </div>
          </motion.div>

          {/* Preço */}
          <motion.div
            className="absolute top-4 right-4"
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="bg-black/80 text-white px-4 py-1.5 rounded-full font-bold backdrop-blur-sm">
              {formatPrice(course.price)}
            </div>
          </motion.div>
        </motion.div>

        {/* Seção de Conteúdo */}
        <div className="p-6">
          {/* Título e Nível */}
          <motion.div
            className="flex justify-between items-start gap-4 mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
              {course.title}
            </h3>
            <div className="text-xs font-bold uppercase px-2 py-1 rounded-full border border-purple-400/20 text-purple-400 bg-purple-400/10">
              {course.level}
            </div>
          </motion.div>

          {/* Descrição */}
          <motion.p
            className="text-gray-400 text-sm mb-6 line-clamp-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {course.description}
          </motion.p>

          {/* Estatísticas do Curso */}
          <motion.div
            className="grid grid-cols-2 gap-4 mb-6"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <BookOpen className="w-4 h-4 text-purple-400" />
                <span>{totalChapters} Aulas</span>
              </div>
              <div className="flex items-center gap-1.5 text-sm text-gray-400">
                <Users className="w-4 h-4 text-purple-400" />
                <span>{course.enrollments?.length || 0} Alunos</span>
              </div>
            </div>
            <div className="space-y-1">
              {contentTypes.Video && (
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <PlayCircle className="w-4 h-4 text-purple-400" />
                  <span>{contentTypes.Video} Vídeos</span>
                </div>
              )}
              {contentTypes.Quiz && (
                <div className="flex items-center gap-1.5 text-sm text-gray-400">
                  <HelpCircle className="w-4 h-4 text-purple-400" />
                  <span>{contentTypes.Quiz} Quizzes</span>
                </div>
              )}
            </div>
          </motion.div>

          {/* Informações do Professor */}
          <motion.div
            className="flex items-center gap-3 mb-6"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
              {course.teacherName?.charAt(0)}
            </div>
            <div>
              <p className="text-white font-medium">{course.teacherName}</p>
              <p className="text-gray-400 text-sm">Professor</p>
            </div>
          </motion.div>

          {/* Botão de Ação */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
          >
            <Button className="w-full bg-purple-500 hover:bg-purple-600 text-white transition-colors">
              Começar curso
              <ChevronRight className="w-4 h-4 ml-2" />
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default CourseCardSearch;
