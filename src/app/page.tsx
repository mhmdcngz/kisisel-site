import React from "react";
import pool from "@/lib/db";
import { RowDataPacket } from "mysql2";

// Components
import { Navbar } from "@/components/home/Navbar";
import { Hero } from "@/components/home/Hero";
import { Projects } from "@/components/home/Projects";
import { Contact } from "@/components/home/Contact";
import { Footer } from "@/components/home/Footer";

async function getSkills() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT * FROM skills ORDER BY proficiency DESC');
    return rows;
  } catch (error) {
    console.error('Yetenekler çekilemedi:', error);
    return [];
  }
}

async function getAboutText() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>('SELECT about_text FROM site_content WHERE id = 1');
    return rows[0]?.about_text || "";
  } catch (error) {
    console.error('Database Error:', error);
    return "";
  }
}

export default async function Home() {
  const skills = await getSkills();
  const aboutText = await getAboutText();

  return (
    <main className="flex flex-col min-h-screen bg-gray-950 selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />
      <Hero aboutText={aboutText} />

      {/* YETENEKLER BÖLÜMÜ */}
      <section id="skills" className="py-20 px-6 max-w-6xl mx-auto border-t border-gray-900">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
            Teknik Yeteneklerim
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Yazılım geliştirme sürecinde kullandığım teknolojiler ve yetkinlik seviyelerim.
          </p>
        </div>

        {skills.length === 0 ? (
          <div className="text-center p-8 border border-gray-800 border-dashed rounded-xl text-gray-500">
            Henüz yetenek girişi yapılmamış. Admin panelinden ekleyebilirsiniz.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill: any) => (
              <div key={skill.id} className="bg-gray-900/40 backdrop-blur-sm border border-gray-800 p-6 rounded-2xl hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5 group">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-bold text-white group-hover:text-blue-400 transition-colors">
                    {skill.name}
                  </h3>
                  <span className="text-xs font-bold font-mono text-blue-400 bg-blue-400/10 px-2 py-1 rounded border border-blue-400/20">
                    %{skill.proficiency}
                  </span>
                </div>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed h-12 line-clamp-2">
                  {skill.description}
                </p>

                {/* Progress Bar */}
                <div className="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-600 to-purple-600 h-full rounded-full shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                    style={{ width: `${skill.proficiency}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
