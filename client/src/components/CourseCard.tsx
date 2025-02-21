"use client";

import { motion } from "framer-motion";
import {
  BookOpen,
  Users,
  PlayCircle,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

const CourseCard = ({ course, onGoToCourse, className }: CourseCardProps) => {
  // Calcular estatísticas do curso
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
      transition={{ duration: 0.3 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <div
        className="relative bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-purple-500/50 transition-all duration-300 cursor-pointer"
        onClick={() => onGoToCourse(course)}
      >
        {/* Seção da Imagem */}
        <motion.div
          className="relative aspect-video overflow-hidden"
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
        >
          <Image
            src={course.image || "/placeholder.png"}
            alt={course.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex gap-2">
            <div className="bg-purple-500/90 text-white px-3 py-1 rounded-full text-sm">
              {course.category}
            </div>
            <div className="bg-black/80 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
              {formatPrice(course.price)}
            </div>
          </div>
        </motion.div>

        {/* Conteúdo */}
        <div className="p-4 space-y-4">
          {/* Título e Professor */}
          <div>
            <h3 className="text-lg font-semibold text-white line-clamp-2">
              {course.title}
            </h3>
            <div className="flex items-center gap-2 mt-2">
              <Avatar className="w-6 h-6">
                <AvatarImage alt={course.teacherName} />
                <AvatarFallback className="bg-purple-500 text-white">
                  {course.teacherName[0]}
                </AvatarFallback>
              </Avatar>
              <p className="text-sm text-gray-400">{course.teacherName}</p>
            </div>
          </div>

          {/* Estatísticas */}
          <div className="grid grid-cols-2 gap-2 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>{totalChapters} Aulas</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-purple-400" />
              <span>{course.enrollments?.length || 0} Alunos</span>
            </div>
            {contentTypes.Video && (
              <div className="flex items-center gap-2">
                <PlayCircle className="w-4 h-4 text-purple-400" />
                <span>{contentTypes.Video} Vídeos</span>
              </div>
            )}
            {contentTypes.Quiz && (
              <div className="flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-purple-400" />
                <span>{contentTypes.Quiz} Quizzes</span>
              </div>
            )}
          </div>

          {/* Botão */}
          <Button
            className="w-full bg-purple-600 hover:bg-purple-700 text-white transition-colors"
            size="sm"
          >
            Continuar Curso
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default CourseCard;
