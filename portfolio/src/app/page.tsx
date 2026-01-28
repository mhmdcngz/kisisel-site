"use client";
import React, { useState, useEffect } from "react";
import { useForm, ValidationError } from '@formspree/react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Linkedin,
  Terminal,
  ArrowRight,
  Coffee,
  Box,
  Network,
  Database,
  FolderGit2,
  Mail,
  Send,
  Copy,
  Check,
  Loader2
} from "lucide-react";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// --- Utility Utils ---
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- UI Components ---
const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "default" | "outline" | "ghost"; size?: "default" | "sm" | "lg" | "icon"; asChild?: boolean }>(
  ({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
    const Comp = "button";
    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
          {
            "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-500/20": variant === "default",
            "border border-slate-700 bg-transparent hover:bg-slate-800 hover:text-white": variant === "outline",
            "hover:bg-blue-500/10 hover:text-blue-400": variant === "ghost",
            "h-10 px-4 py-2": size === "default",
            "h-9 rounded-md px-3": size === "sm",
            "h-11 rounded-md px-8": size === "lg",
            "h-10 w-10": size === "icon",
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

const Badge = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement> & { variant?: "default" | "secondary" | "outline" }>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div ref={ref} className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
        "border-transparent bg-blue-500/20 text-blue-200 hover:bg-blue-500/30": variant === "default",
        "border-transparent bg-slate-800/80 text-slate-300 hover:bg-slate-700 border-slate-700/50": variant === "secondary",
        "text-slate-300 border-slate-700": variant === "outline"
      }, className)} {...props} />
    )
  }
)
Badge.displayName = "Badge";

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "rounded-xl border border-slate-800 bg-slate-900/50 text-slate-100 shadow-sm backdrop-blur-md transition-all duration-300 hover:border-blue-500/30 hover:shadow-[0_0_20px_rgba(59,130,246,0.1)]",
      className
    )}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex flex-col space-y-1.5 p-6", className)} {...props} />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLHeadingElement>>(({ className, ...props }, ref) => (
  <h3 ref={ref} className={cn("text-lg font-semibold leading-none tracking-tight text-white", className)} {...props} />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef<HTMLParagraphElement, React.HTMLAttributes<HTMLParagraphElement>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn("text-sm text-slate-400", className)} {...props} />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("p-6 pt-0", className)} {...props} />
));
CardContent.displayName = "CardContent";

const CardFooter = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div ref={ref} className={cn("flex items-center p-6 pt-0", className)} {...props} />
));
CardFooter.displayName = "CardFooter";

// --- Sections ---

function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 w-full z-50 transition-all duration-300 border-b border-transparent",
      scrolled ? "bg-slate-900/80 backdrop-blur-md border-slate-800" : "bg-transparent"
    )}>
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 group">
          <div className="p-1 rounded bg-blue-500/10 border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">
            <Terminal className="w-5 h-5 text-blue-500" />
          </div>
          <span className="font-mono font-bold text-lg tracking-tight text-white">muhammed_cengiz</span>
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="#hero" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Giriş</Link>
          <Link href="#skills" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Yetenekler</Link>
          <Link href="#projects" className="text-sm font-medium text-slate-400 hover:text-blue-400 transition-colors">Projeler</Link>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 mr-2" asChild>
            <Link href="#contact">Bana Ulaş</Link>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-blue-500/10 hover:text-blue-400 group" asChild>
            <Link href="https://github.com/mhmdcngz" target="_blank" rel="noopener noreferrer"><Github className="w-5 h-5 group-hover:rotate-12 transition-transform" /></Link>
          </Button>
          <Button variant="ghost" size="icon" className="hover:bg-[#0077b5]/10 hover:text-[#0077b5]" asChild>
            <Link href="https://www.linkedin.com/in/mhmdcngz" target="_blank" rel="noopener noreferrer"><Linkedin className="w-5 h-5" /></Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}

function Hero() {
  return (
    <section id="hero" className="min-h-screen flex flex-col justify-center px-4 pt-16 relative overflow-hidden bg-slate-950">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] -z-10 opacity-60" />
      <div className="container mx-auto">
        <div className="max-w-4xl">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <span className="text-blue-500 font-mono text-lg mb-4 block">Merhaba, ben</span>
            <h1 className="text-5xl md:text-7xl font-bold text-slate-50 mb-6 tracking-tight">Muhammed Cengiz.</h1>
            <h2 className="text-3xl md:text-5xl font-bold text-slate-400 mb-8">
              Fırat Üniversitesi Öğrencisi & <br className="hidden md:block" />
              <span className="text-blue-500 relative inline-block">Java Geliştiricisi.</span>
            </h2>
          </motion.div>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }} className="text-lg md:text-xl text-slate-400 mb-10 max-w-2xl leading-relaxed">
            Nesne yönelimli programlama ve modern yazılım mimarileri üzerine çalışıyorum.
            Karmaşık problemleri <span className="text-slate-200 font-medium">Java teknolojileri</span> ile çözmeye odaklıyım.
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="flex flex-wrap gap-4">
            <Button size="lg" className="h-12 px-8 text-base bg-blue-600 hover:bg-blue-700 text-white border-0 shadow-lg shadow-blue-500/20 group" asChild>
              <Link href="https://github.com/mhmdcngz" target="_blank" rel="noopener noreferrer"><Github className="mr-2 w-5 h-5 group-hover:rotate-12 transition-transform" /> GitHub'a Git</Link>
            </Button>
            <Button variant="outline" size="lg" className="h-12 px-6 border-slate-700 text-slate-300 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-colors" asChild>
              <Link href="https://www.linkedin.com/in/mhmdcngz" target="_blank" rel="noopener noreferrer"><Linkedin className="mr-2 w-5 h-5" /> LinkedIn</Link>
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  const skills = [
    { title: "OOP", icon: <Box className="w-6 h-6 text-blue-500" />, description: "Nesne Yönelimli Programlama", items: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction"] },
    { title: "Collections", icon: <Database className="w-6 h-6 text-blue-500" />, description: "Java Collections Framework", items: ["ArrayList", "HashMap", "HashSet", "Iterator"] }
  ];

  return (
    <section id="skills" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">Teknik Yetkinlikler</h2>
          <div className="h-1 w-20 bg-blue-500 rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl">Java ekosistemindeki uzmanlık alanlarım ve kullandığım temel teknolojiler.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {skills.map((skill, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Card className="h-full bg-slate-900/50 border-slate-800 hover:border-blue-500/30 transition-all duration-300 group">
                <CardHeader className="space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-500/10 flex items-center justify-center border border-blue-500/20 group-hover:border-blue-500/50 transition-colors">{skill.icon}</div>
                  <div><CardTitle className="text-lg font-bold text-slate-100">{skill.title}</CardTitle><p className="text-xs text-blue-400 mt-1 uppercase tracking-wider">{skill.description}</p></div>
                </CardHeader>
                <CardContent><div className="flex flex-wrap gap-2">{skill.items.map((item) => (<Badge key={item} variant="secondary" className="bg-slate-800/80 text-slate-300 hover:bg-slate-700 border border-slate-700/50">{item}</Badge>))}</div></CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  const projects = [
    { title: "ATM Simülasyonu (Java)", description: "GUI (Arayüz) olmadan; tamamen OOP (Nesne Yönelimli Programlama) prensipleriyle tasarlanmış, bakiye yönetimi ve kullanıcı güvenliği sağlayan backend simülasyonu.", tags: ["Java SE", "Authentication", "Input Validation", "Clean Code"], github: "https://github.com/mhmdcngz/ATM-java" },
    { title: "Macera Oyunu (Java)", description: "Java ve Nesne Yönelimli Programlama (OOP) prensipleri kullanılarak geliştirilmiş, canavarlarla savaşıp eşyalar topladığınız metin tabanlı bir RPG oyunu.", tags: ["OOP", "Polymorphism", "Inheritance", "Abstract Classes"], github: "https://github.com/mhmdcngz/Macera-Oyunu" }
  ];

  return (
    <section id="projects" className="py-24 bg-slate-900/30 border-y border-slate-800/50">
      <div className="container mx-auto px-4">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-12">
          <div className="flex items-center gap-3 mb-4"><FolderGit2 className="w-8 h-8 text-blue-500" /><h2 className="text-3xl md:text-4xl font-bold text-slate-50">Seçili Projeler</h2></div>
          <div className="h-1 w-20 bg-blue-500 rounded-full mb-6" />
          <p className="text-slate-400 max-w-2xl">Aktif olarak geliştirdiğim açık kaynak projelerim.</p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div key={index} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Card className="h-full flex flex-col bg-slate-900/60 border-slate-800 hover:border-blue-500/40 hover:shadow-lg hover:shadow-blue-500/5 transition-all duration-300 group">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-slate-100 group-hover:text-blue-400 transition-colors">{project.title}</CardTitle>
                  <CardDescription className="pt-4 text-base leading-relaxed text-slate-400">{project.description}</CardDescription>
                </CardHeader>
                <CardContent className="mt-auto pt-4"><div className="flex flex-wrap gap-2 mb-6">{project.tags.map(tag => (<Badge key={tag} variant="outline" className="border-blue-500/20 text-blue-400 bg-blue-500/5">{tag}</Badge>))}</div></CardContent>
                <CardFooter className="gap-4 pt-0">
                  <Button variant="outline" className="w-full border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-slate-600" asChild>
                    <Link href={project.github} target="_blank"><Github className="w-4 h-4 mr-2" /> Kaynak Kodu</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}


function Contact() {
  const [state, handleSubmit] = useForm("xvzrgqvo");
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText("mhmdcngz@outlook.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section id="contact" className="py-24 relative overflow-hidden bg-slate-950">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -z-10" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-12"
        >
          {/* Left Side - Info */}
          <div className="flex flex-col justify-center space-y-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-50 mb-4">İletişime Geçin</h2>
              <div className="h-1 w-20 bg-blue-500 rounded-full mb-6" />
              <p className="text-slate-400 text-lg leading-relaxed">
                Projeleriniz, iş birlikleri veya sadece merhaba demek için bana her zaman ulaşabilirsiniz.
                Mesajlarınıza en kısa sürede dönüş yapmaya çalışıyorum.
              </p>
            </div>

            <div className="space-y-4">
              <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 backdrop-blur-sm flex items-center justify-between group hover:border-blue-500/30 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="text-slate-300 font-medium">mhmdcngz@outlook.com</span>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleCopy}
                  className="text-slate-500 hover:text-blue-400"
                >
                  {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>

              <div className="flex gap-4">
                <Button variant="outline" className="flex-1 h-12 border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-slate-800 hover:border-blue-500/30 hover:text-white group" asChild>
                  <Link href="https://github.com/mhmdcngz" target="_blank" rel="noopener noreferrer">
                    <Github className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform" /> GitHub
                  </Link>
                </Button>
                <Button variant="outline" className="flex-1 h-12 border-slate-800 bg-slate-900/50 text-slate-300 hover:bg-[#0077b5] hover:border-[#0077b5] hover:text-white transition-colors" asChild>
                  <Link href="https://www.linkedin.com/in/mhmdcngz" target="_blank" rel="noopener noreferrer">
                    <Linkedin className="w-4 h-4 mr-2" /> LinkedIn
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <Card className="border-slate-800 bg-slate-900/30">
            <CardHeader>
              <CardTitle className="text-2xl">Bana Yazın</CardTitle>
              <CardDescription>Aşağıdaki formu doldurarak bana doğrudan mesaj gönderebilirsiniz.</CardDescription>
            </CardHeader>
            <CardContent>
              {state.succeeded ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-8 text-center space-y-4"
                >
                  <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center">
                    <Check className="w-8 h-8 text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">Mesajınız Alındı!</h3>
                  <p className="text-slate-400 max-w-xs">En kısa sürede size dönüş yapacağım. İletişime geçtiğiniz için teşekkürler.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-slate-400">Adınız Soyadınız</label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                      placeholder="Ahmet Yılmaz"
                    />
                    <ValidationError prefix="Name" field="name" errors={state.errors} className="text-red-500 text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-slate-400">E-posta Adresiniz</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="flex h-10 w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all"
                      placeholder="ahmet@ornek.com"
                    />
                    <ValidationError prefix="Email" field="email" errors={state.errors} className="text-red-500 text-xs" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-sm font-medium text-slate-400">Mesajınız</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      className="flex min-h-[120px] w-full rounded-md border border-slate-800 bg-slate-950/50 px-3 py-2 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500/50 transition-all resize-none"
                      placeholder="Projenizden bahsedin..."
                    />
                    <ValidationError prefix="Message" field="message" errors={state.errors} className="text-red-500 text-xs" />
                  </div>
                  <Button disabled={state.submitting} type="submit" className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-500/20 group disabled:opacity-70 disabled:cursor-not-allowed">
                    {state.submitting ? (
                      <>Gönderiliyor... <Loader2 className="w-4 h-4 ml-2 animate-spin" /></>
                    ) : (
                      <>Gönder <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" /></>
                    )}
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>

        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 bg-slate-950 border-t border-slate-800 mt-auto">
      <div className="container mx-auto px-4 text-center text-sm text-neutral-500">
        <p>© 2026 Muhammed Cengiz. Tüm hakları saklıdır.</p>
      </div>
    </footer>
  );
}

// --- Main Page ---
export default function Home() {
  return (
    <main className="flex flex-col min-h-screen bg-slate-950 selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />
      <Hero />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
