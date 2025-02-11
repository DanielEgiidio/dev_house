import Loading from "@/components/Loading";
import { Button } from "@/components/ui/button";
import { useGetCoursesQuery } from "@/state/api";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import Link from "next/link";
import React from "react";

const CompletionPage = () => {
  const { data: courses, isLoading } = useGetCoursesQuery({});
  const course = courses?.[0];

  if (isLoading) return <Loading />;

  return (
    <div className="completion">
      <div className="completion__content">
        <div className="completion__icon">
          <Check className="w-16 h-16" />
        </div>
        <h1 className="completion__title">Compra Finalizada!</h1>
        <p className="completion__subtitle text-xl pt-4">
          🎉 Você acabou de realizar a compra do curso
          <b> {course ? course.title : "Desconhecido"}</b>
        </p>
      </div>
      <div className="completion__support">
        <p className="completion__subtitle text-lg py-3 inline-flex gap-2 align-center justify-center">
          Precisa de ajuda ? Entre em contato com nossa equipe de suporte
          <ArrowRight />
          <Button
            asChild
            variant="link"
            className="p-0 m-0 text-primary-700 text-lg align-center justify-center "
          >
            <a href="mailto:suporte@devhouse.com" className="pb-1.5">
              Suporte Dev House
            </a>
          </Button>
        </p>
      </div>
      <div className="inline-flex items-center px-8 py-4 my-3 text-white bg-primary-700 rounded-lg shadow-md hover:opacity-90 transition-all duration-100 text-gray-50 text-base">
        <Link href="/users/courses" className="">
          Ir para curso
        </Link>
      </div>
    </div>
  );
};

export default CompletionPage;
