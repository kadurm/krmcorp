const Footer = () => {
  return (
    <footer className="border-t border-border py-12">
      <div className="container max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <span className="font-display text-sm text-muted-foreground">
          © {new Date().getFullYear()} · Todos os direitos reservados
        </span>
        <div className="flex gap-6">
          <a
            href="https://www.instagram.com/krm.corpigsh=cnpwZ2FxMjl0eXV1&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-primary text-xs tracking-wider uppercase transition-colors"
          >
            Instagram
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
