import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2024 DevHouse. Todos os direitos reservados.</p>
      <div className="footer__links">
        {["Sobre", "Política de Privacidade", "Termos de uso", "Contato"].map(
          (item) => (
            <Link
              key={item}
              href={`/${item.toLowerCase().replace(" ", "-")}`}
              className="footer__link"
              scroll={false}
            >
              {item}
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Footer;
