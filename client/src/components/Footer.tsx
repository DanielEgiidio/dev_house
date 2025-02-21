import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-950 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Direitos autorais */}
          <p className="text-gray-400 text-sm text-center md:text-left">
            &copy; {new Date().getFullYear()} DevHouse. Todos os direitos
            reservados.
          </p>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              "Sobre",
              "Política de Privacidade",
              "Termos de uso",
              "Contato",
            ].map((item) => (
              <Link
                key={item}
                href={`/${item.toLowerCase().replace(" ", "-")}`}
                className="text-gray-400 hover:text-purple-400 text-sm transition-colors duration-200"
                scroll={false}
              >
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Versão mobile */}
        <div className="mt-6 border-t border-gray-800/50 pt-6 text-center md:hidden">
          <p className="text-xs text-gray-500">
            Desenvolvido com ❤️ pela equipe DevHouse
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
