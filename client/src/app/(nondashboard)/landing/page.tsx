"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useCarousel } from "@/hooks/useCarousel";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCoursesQuery } from "@/state/api";
import CourseCardSearch from "@/components/CourseCardSearch";
import { useRouter } from "next/navigation";
import CodeEditorHeader from "@/components/CodeEditorHeader";
import { BookOpen, ChevronRight, Code, Users } from "lucide-react";
import { Button } from "@/components/ui/button";

const LoadingSkeleton = () => {
  return (
    <div className="landing-skeleton space-y-16">
      {/* Hero Section Skeleton */}
      <div className="flex flex-col md:flex-row gap-8 min-h-[80vh] items-center">
        {/* Text Content */}
        <div className="flex-1 space-y-6">
          <Skeleton className="h-12 w-3/4 bg-gray-800 rounded-lg" />
          <Skeleton className="h-6 w-full bg-gray-800 rounded-lg" />
          <Skeleton className="h-6 w-2/3 bg-gray-800 rounded-lg" />
          <Skeleton className="h-12 w-48 bg-gray-800 rounded-xl" />
        </div>
        {/* Code Editor */}
        <Skeleton className="flex-1 w-full h-[500px] md:h-[600px] bg-gray-800 rounded-xl" />
      </div>

      {/* Featured Courses Skeleton */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
          <Skeleton className="w-8 h-8 bg-gray-800 rounded-full" />
          <Skeleton className="h-8 w-64 bg-gray-800 rounded-lg" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((_, index) => (
            <div
              key={index}
              className="h-full flex flex-col border border-gray-800 rounded-2xl overflow-hidden"
            >
              <Skeleton className="aspect-video bg-gray-800" />
              <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                <div>
                  <Skeleton className="h-6 w-3/4 bg-gray-800 rounded-lg mb-3" />
                  <Skeleton className="h-4 w-full bg-gray-800 rounded-lg" />
                  <Skeleton className="h-4 w-2/3 bg-gray-800 rounded-lg mt-2" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <Skeleton className="h-4 w-24 bg-gray-800 rounded-lg" />
                    <Skeleton className="h-4 w-24 bg-gray-800 rounded-lg" />
                  </div>
                  <Skeleton className="h-10 w-full bg-gray-800 rounded-lg" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Learning Paths Skeleton */}
      <div className="space-y-8 py-20 bg-gray-900/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center gap-3 justify-center">
            <Skeleton className="w-8 h-8 bg-gray-800 rounded-full" />
            <Skeleton className="h-8 w-64 bg-gray-800 rounded-lg" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="bg-gray-800 rounded-2xl p-8 border border-gray-700 h-full"
              >
                <div className="flex items-center gap-4 mb-6">
                  <Skeleton className="w-12 h-12 bg-gray-700 rounded-xl" />
                  <Skeleton className="h-6 w-3/4 bg-gray-700 rounded-lg" />
                </div>
                <Skeleton className="h-16 bg-gray-700 rounded-lg mb-8" />
                <div className="flex justify-between items-center">
                  <Skeleton className="h-4 w-24 bg-gray-700 rounded-lg" />
                  <Skeleton className="h-10 w-28 bg-gray-700 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Community Section Skeleton */}
      <div className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="bg-gray-800 rounded-2xl p-12 text-center">
            <div className="max-w-3xl mx-auto space-y-8">
              <div className="flex flex-col items-center mb-12">
                <Skeleton className="w-16 h-16 bg-gray-700 rounded-full mb-6" />
                <Skeleton className="h-8 w-64 bg-gray-700 rounded-lg mb-4" />
                <Skeleton className="h-6 w-3/4 bg-gray-700 rounded-lg" />
              </div>
              <div className="flex flex-wrap justify-center gap-12 mb-16">
                <div className="text-center">
                  <Skeleton className="h-12 w-24 bg-gray-700 rounded-lg mb-2" />
                  <Skeleton className="h-4 w-32 bg-gray-700 rounded-lg" />
                </div>
                <div className="text-center">
                  <Skeleton className="h-12 w-24 bg-gray-700 rounded-lg mb-2" />
                  <Skeleton className="h-4 w-32 bg-gray-700 rounded-lg" />
                </div>
              </div>
              <Skeleton className="h-16 w-64 mx-auto bg-gray-700 rounded-xl" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Landing = () => {
  const router = useRouter();
  const currentImage = useCarousel({ totalImages: 3 });

  const { data: courses, isLoading, isError } = useGetCoursesQuery({});

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
    },
  };

  const handleCourseClick = (courseId: string) => {
    router.push(`/search?id=${courseId}`),
      {
        scroll: false,
      };
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="landing "
    >
      {/* Hero */}
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="landing__hero"
      >
        <div className="landing__hero-content">
          <h1 className="landing__title">Aprenda. Ensine. Cresça!</h1>
          <p className="landing__description max-w-[600px]">
            Uma plataforma para educadores e estudantes explorarem as mais
            recentes tecnologias de desenvolvimento.
          </p>
          <div className="landing__cta">
            <Link href="/search" scroll={false}>
              <div className="landing__cta-button">Pesquisar por cursos</div>
            </Link>
          </div>
        </div>
        <div className="basis-1/2 h-full flex items-center justify-center p-8">
          <CodeEditorHeader />
        </div>
      </motion.div>

      {/* Main */}

      <motion.div
        className="landing__featured"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h3
          className="text-2xl font-bold mb-6 flex items-center "
          variants={itemVariants}
        >
          <BookOpen className="mr-2 text-[#FFF]" />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            {" "}
            Cursos em Destaque
          </span>
        </motion.h3>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {courses &&
            courses.slice(0, 4).map((course, index) => (
              <motion.div
                key={course.courseId}
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ amount: 0.4 }}
              >
                <CourseCardSearch
                  course={course}
                  onClick={() => handleCourseClick(course.courseId)}
                />
              </motion.div>
            ))}
        </motion.div>
      </motion.div>

      {/* Trilhas de Aprendizado */}
      <motion.div
        className="my-16"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h3
          className="md:text-3xl text-2xl font-bold mb-8 flex items-center gap-3 ml-2 md:ml-0"
          variants={itemVariants}
        >
          <Code className="w-8 h-8 text-[#FFF]" />
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent ">
            Trilhas de Aprendizado
          </span>
        </motion.h3>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 md:p-0"
          variants={containerVariants}
        >
          {[
            "Web Development",
            "Enterprise IT",
            "React & Next.js",
            "JavaScript",
            "Backend Development",
          ].map((path, index) => (
            <motion.div
              key={path}
              variants={itemVariants}
              className="group relative bg-gray-900 rounded-xl p-6 border border-gray-800 hover:border-purple-400/30 transition-all duration-300 shadow-xl hover:shadow-2xl"
              whileHover={{ y: -5 }}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />

              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-purple-500/10 rounded-lg">
                    <Code className="w-6 h-6 text-[#FFF]" />
                  </div>
                  <h4 className="text-xl font-semibold bg-gradient-to-r from-purple-300 to-pink-200 bg-clip-text text-transparent">
                    {path}
                  </h4>
                </div>

                <p className="text-gray-400 mb-6 text-sm leading-relaxed">
                  Domine as habilidades essenciais para se tornar um
                  profissional completo com projetos práticos e mentorias
                  especializadas.
                </p>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-purple-300 text-sm">
                    <BookOpen className="w-4 h-4" />
                    <span>12 Módulos</span>
                  </div>

                  <Button
                    variant="ghost"
                    className="text-purple-300 hover:text-white hover:bg-purple-500/10 px-4 py-2 rounded-lg transition-colors"
                  >
                    <Link href="/search" scroll={false}>
                      Explorar
                    </Link>
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Comunidade */}
      <motion.div
        className="my-16 p-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h3
          className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3 ml-2 md:ml-0"
          variants={itemVariants}
        >
          <div className="p-2 bg-purple-500/10 rounded-full">
            <Users className="w-8 h-8 text-[#FFF]" />
          </div>
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Comunidade DevHouse
          </span>
        </motion.h3>

        <motion.div
          variants={itemVariants}
          className="group relative bg-gray-900 rounded-xl p-8 border-2 border-gray-800 hover:border-purple-400/30 transition-all duration-300 shadow-2xl hover:shadow-3xl overflow-hidden"
          whileHover={{ y: -5 }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 to-pink-900/10 opacity-0 group-hover:opacity-100 transition-opacity" />

          <div className="relative z-10 space-y-6">
            <div className="space-y-4">
              <h4 className="text-2xl font-semibold text-purple-200">
                Conexões que Transformam
              </h4>
              <p className="text-gray-400 text-lg leading-relaxed">
                Junte-se a milhares de educadores e desenvolvedores em um
                ecossistema colaborativo de aprendizagem contínua. Compartilhe
                projetos, participe de desafios e acelere seu crescimento.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              <div className="flex items-center gap-2 text-purple-300">
                <span className="text-4xl font-bold">5K+</span>
                <span className="text-sm">Membros Ativos</span>
              </div>

              <div className="hidden sm:block h-8 w-px bg-purple-400/20" />

              <div className="flex items-center gap-2 text-purple-300">
                <span className="text-4xl font-bold">120+</span>
                <span className="text-sm">Projetos Colaborativos</span>
              </div>
            </div>

            <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white py-6 rounded-xl transition-all group">
              <span className="flex items-center gap-3">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="w-6 h-6"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
                <span className="text-lg">Unir-se à Comunidade</span>
                <ChevronRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
              </span>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Landing;
